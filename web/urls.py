from django.urls import path
from .views import RegistrationView, LoginView, CreateShortUrlView, RedirectToLongUrl

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login", LoginView.as_view(), name="login"),
    path("short", CreateShortUrlView.as_view(), name="createshorturl"),
    path("<str:short_url>", RedirectToLongUrl.as_view(), name="redirect_to_long_url"),
]
