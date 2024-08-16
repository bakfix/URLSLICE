from rest_framework import serializers
from .models import User, Url

'''
Сериализаторы для общения бд с
сервисом
'''
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "email", "password"]


class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = ['long_url', 'short_url', 'stat_click', 'reg_url', 'user']
