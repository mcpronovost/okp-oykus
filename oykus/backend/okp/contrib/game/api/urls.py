from django.urls import path

from .views import (
    OkpGameSidePopularView,
)

urlpatterns = [
    path("side/popular/", OkpGameSidePopularView.as_view(), name="game-side-popular-list"),
]
