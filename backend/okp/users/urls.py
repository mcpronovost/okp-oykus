from django.urls import path

from okp.users.views import (
    okpLoginView,
    okpLogoutView,
    okpRatView
)

urlpatterns = [
    path("login/", okpLoginView.as_view()),
    path("logout/", okpLogoutView.as_view()),
    path("rat/", okpRatView.as_view()),
]
