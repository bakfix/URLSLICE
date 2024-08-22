import string

from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Url
from .serializers import UserSerializer, UrlSerializer
import random
from rest_framework_simplejwt.tokens import RefreshToken

URL = "http://localhost:3000"

'''
В целях безопасности для каждого пользователя, который
вводит пароль создается уникальный хэш из библиотеки 
make_password и check_password.
'''


class RegistrationView(APIView):
    def post(self, request, format=None):
        request.data["password"] = make_password(
            password=request.data["password"]
        )

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Вы зарегистрировались на DELTA Short Link!",
                    "email": user.email
                },
                status=status.HTTP_201_CREATED,
            )

        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_200_OK,
            )


'''
check_password базовая функция, которая 
проверяет, что это тот самый пользователь
'''


class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data["email"]
        password = request.data["password"]

        try:
            user = User.objects.get(email=email)
            if not check_password(password, user.password):
                return Response(
                    {"success": False, "message": "Введен неверный логин или пароль!"},
                    status=status.HTTP_200_OK,
                )

            is_admin = user.is_superuser

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            print("Request user:", request.user)

            user_id = request.user.id
            print("User ID:", user_id)

            return Response(
                {
                    "success": True,
                    "message": f"Вы вошли в аккаунт {email}!",
                    "is_admin": is_admin,
                    "token": access_token,
                },
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Введен неверный логин или пароль!"},
                status=status.HTTP_200_OK,
            )

class CreateShortUrlView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            '''
            обычный цикл в котором проверяется уникальность 
            короткой ссылки, если такая уже есть, заменяется на новую.
            Но даже если url нет в бд, то записывается новая уникальная
            ссылка
            '''
            long_url = request.data.get('long_url')

            print("Request user:", request.user)

            user_id = request.user.id
            print("User ID:", user_id)

            while True:
                short_url_new = ''.join(random.choices(string.ascii_letters + string.digits, k=5)) # Создание короткой ссылки
                if not Url.objects.filter(short_url=short_url_new).exists():
                    short_url = short_url_new
                    break
            '''
            обновление/создание существующей записи
            '''
            url, created = Url.objects.update_or_create(
                long_url=long_url,
                defaults={'short_url': short_url, 'user': request.user}
            )

            return Response({'short_url': url.short_url}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f'Ошибка: {e}')
            return Response({'error': 'Ошибка сервера'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RedirectToLongUrl(APIView):
    def get(self, request, short_url):
        url = get_object_or_404(Url, short_url=short_url)
        url.stat_click += 1
        url.save()
        return redirect(url.long_url)


class AdminPanelView(APIView):
    def get(self, request):
        users = User.objects.all().values('id', 'email')
        return JsonResponse(list(users), safe=False)

    def delete(self, request, user_id=None):
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return JsonResponse({'message': 'User deleted successfully'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

class UserUrlsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        urls = Url.objects.filter(user=user)
        serializer = UrlSerializer(urls, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)