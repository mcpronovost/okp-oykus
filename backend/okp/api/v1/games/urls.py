from django.urls import path

from .views import (
    OkpGameManagementCreateView,
    OkpGameManagementListView,
    OkpGameManagementDetailView,
)

urlpatterns = [
    path(
        "",
        OkpGameManagementCreateView.as_view(),
        name="game_management_create",
    ),
    path(
        "management/list/",
        OkpGameManagementListView.as_view(),
        name="game_management_list",
    ),
    path(
        "management/<slug:slug>/detail/",
        OkpGameManagementDetailView.as_view(),
        name="game_management_detail",
    ),
]
