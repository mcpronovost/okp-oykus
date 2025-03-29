from django.urls import path

from .views import (
    OkpForumTopicView,
    OkpForumTopicCreateView,
    OkpForumPostsView,
    OkpForumPostCreateView,
    OkpForumPostDeleteView,
)

urlpatterns = [
    path("topics/create/", OkpForumTopicCreateView.as_view(), name="topic-create"),
    path("topics/<int:pk>/", OkpForumTopicView.as_view(), name="topic-detail"),
    path("topics/<int:topic_id>/posts/", OkpForumPostsView.as_view(), name="topic-posts-list"),
    path("posts/create/", OkpForumPostCreateView.as_view(), name="post-create"),
    path("posts/<int:pk>/delete/", OkpForumPostDeleteView.as_view(), name="post-delete"),
]
