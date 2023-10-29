from django.urls import include, path

from okp.api.views import okpPingView

urlpatterns = [
    path("", okpPingView.as_view()),
    path("auth/", include("okp.api.auth.urls"))
]
