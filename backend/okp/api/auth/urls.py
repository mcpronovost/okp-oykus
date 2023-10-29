from django.urls import path
from knox import views as knox_views

from okp.api.auth.views import (
    okpRegisterView,
    okpLoginView
)

urlpatterns = [
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
