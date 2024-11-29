from django.urls import include, path

urlpatterns = [
    path("users/", include("okp.api.v1.users.urls")),
    path("games/", include("okp.api.v1.games.urls")),
]
