from django.urls import path
from django.utils.translation import gettext_lazy as _

from okp.games.views import (
    okpGamesView,
    okpGameView
)

urlpatterns = [
    path("", okpGamesView.as_view()),
    path("<slug:slug>/", okpGameView.as_view())
]
