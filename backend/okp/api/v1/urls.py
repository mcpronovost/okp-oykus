from django.urls import include, path

from .views import PingView

urlpatterns = [
    path("ping/", PingView.as_view(), name="ping"),
    path("users/", include("okp.api.v1.users.urls")),
    path("games/", include("okp.api.v1.games.urls")),
]
