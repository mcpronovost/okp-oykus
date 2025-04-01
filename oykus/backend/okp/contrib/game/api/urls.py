from django.urls import path

from .views import (
    OkpGameSidePopularView,
    OkpGameCreateView,
    OkpGameUpdateView,
)

urlpatterns = [
    path("side/popular/", OkpGameSidePopularView.as_view(), name="game-side-popular-list"),
    path("create/", OkpGameCreateView.as_view(), name="game-create"),
    path("<int:pk>/update/", OkpGameUpdateView.as_view(), name="game-update"),
]
