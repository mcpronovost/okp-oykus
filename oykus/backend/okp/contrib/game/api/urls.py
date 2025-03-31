from django.urls import path

from .views import (
    OkpGameSidePopularView,
    OkpGameUpdateView,
)

urlpatterns = [
    path("side/popular/", OkpGameSidePopularView.as_view(), name="game-side-popular-list"),
    path("<int:pk>/update/", OkpGameUpdateView.as_view(), name="game-update"),
]
