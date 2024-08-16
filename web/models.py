from django.db import models

'''
Создана базовая модель пользователя, а 
также модель для Url линка
'''
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name


class Url(models.Model):
    long_url = models.URLField(max_length=2048)
    short_url = models.CharField(max_length=50, unique=True)
    stat_click = models.IntegerField(default=0)
    reg_url = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'[ {self.long_url[:40]} ] Создана [{self.reg_url} пользователем [{self.user}]'
