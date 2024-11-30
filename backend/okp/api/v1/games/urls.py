from django.urls import path

from .views import OkpGameCreateView

urlpatterns = [
    path("", OkpGameCreateView.as_view(), name="game_create"),
    # path("<slug:slug>/", GameView.as_view(), name="game_detail"),
]
