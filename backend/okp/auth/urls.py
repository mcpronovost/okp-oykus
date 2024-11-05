from django.urls import include, path
from django.utils.translation import gettext_lazy as _

from okp.auth.views import (
    okpMeView,
    okpMeCharactersView
)

urlpatterns = (
    [
        path("/", include("knox.urls")),
        path("me/", okpMeView.as_view()),
        path("me/characters/", okpMeCharactersView.as_view())
    ]
)
