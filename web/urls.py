from django.urls import path
from .views import RegistrationView, LoginView

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login", LoginView.as_view(), name="login"),
    # path("tokens", CreateShortLinkView.as_view(), name="shortlink")
]