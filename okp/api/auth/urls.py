from django.urls import path
from knox import views as knox_views

from okp.api.auth.views import (
    okpAuthView,
    okpRegisterView,
    okpLoginView
)

urlpatterns = [
    path(
        "",
        okpAuthView.as_view(),
        name="auth"
    ),
    path(
        "register/",
        okpRegisterView.as_view(),
        name="auth_register"
    ),
    path(
        "login/",
        okpLoginView.as_view(),
        name="auth_login"
    ),
    path(
        "logout/",
        knox_views.LogoutView.as_view(),
        name="knox_logout"
    )
]
