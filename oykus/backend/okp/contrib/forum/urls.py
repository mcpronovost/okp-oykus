from django.urls import path

from .views import (
    OkpForumPostsView,
)

urlpatterns = [
    path("topics/<str:topic_id>/posts/", OkpForumPostsView.as_view(), name="topic-posts-list"),
    path("posts/", OkpForumPostsView.as_view(), name="posts-list"),
]
