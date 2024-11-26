from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import SignInApiView, SignOutApiView


urlpatterns = [
    path("token/", SignInApiView.as_view(), name="token_obtain"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("sign-out/", SignOutApiView.as_view(), name="sign-out"),
]
