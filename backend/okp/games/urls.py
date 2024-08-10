from django.urls import path
from okp.games.views import (
    okpGameView,
    okpGameSidePopularView
)

app_name = "okp.games"

urlpatterns = [
    path("side-popular/", okpGameSidePopularView.as_view()),
    path("<slug:slug>/", okpGameView.as_view()),
]
