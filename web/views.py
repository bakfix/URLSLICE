import string
from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import get_object_or_404, redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Url
from .serializers import UserSerializer
import random

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
            serializer.save()
            return Response(
                {"success": True, "message": "Вы зарегистрировались на DELTA Short Link!"},
                status=status.HTTP_200_OK,
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
                    {"success": False, "message": "Введен не верный логин или пароль!"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"success": True, "message": f"Вы вошли в аккаунт {email}!"},
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Введен не верный логин или пароль!"},
                status=status.HTTP_200_OK,
            )


'''
Создание короткой ссылки происходит с помощью
библиотеки hashlib (256 хэширование). после сервер возвращает 
проверка на ошибки
'''


class CreateShortUrlView(APIView):
    def post(self, request):
        try:
            '''
            обычный цикл в котором проверяется уникальность 
            короткой ссылки, если такая уже есть, заменяется на новую.
            Но даже если url нет в бд, то записывается новая уникальная
            ссылка
            '''
            long_url = request.data.get('long_url')
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
                defaults={'short_url': short_url}
            )

            return Response({'short_url': url.short_url}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f'Ошибка: {e}')
            return Response({'error': 'Ошибка сервера'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RedirectToLongUrl(APIView):
    def get(self, request, short_url):
        url = get_object_or_404(Url, short_url=short_url)
        return redirect(url.long_url)
