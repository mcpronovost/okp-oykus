from django.urls import path

from .views import OkpGameCreateView, OkpGameListView, OkpGameDetailView

urlpatterns = [
    path("", OkpGameCreateView.as_view(), name="game_create"),
    path("list/", OkpGameListView.as_view(), name="game_list"),
    path("<slug:slug>/", OkpGameDetailView.as_view(), name="game_detail"),
]
