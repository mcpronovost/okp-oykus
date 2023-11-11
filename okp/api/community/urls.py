from django.urls import path

from okp.api.community.views import (
    okpCommunityUsersListView
)

urlpatterns = [
    path(
        "users/list/",
        okpCommunityUsersListView.as_view(),
        name="community_users_list"
    )
]
