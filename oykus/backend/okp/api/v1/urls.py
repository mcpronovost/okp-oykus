from django.urls import include, path

urlpatterns = [
    path("auth/", include("okp.contrib.auth.api.urls")),
    path("forum/", include("okp.contrib.forum.api.urls")),
    path("game/", include("okp.contrib.game.api.urls")),
]
