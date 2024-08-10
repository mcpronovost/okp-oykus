from django.urls import path
from okp.games.views import (
    okpGameSidePopularView
)

app_name = "okp.games"

urlpatterns = [
    path("side-popular/", okpGameSidePopularView.as_view()),
]
