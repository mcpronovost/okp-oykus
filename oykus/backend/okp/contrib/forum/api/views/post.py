from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, UpdateAPIView

from okp.contrib.forum.models import OkpForumPost
from okp.contrib.forum.serializers import (
    OkpForumPostListSerializer,
    OkpForumPostCreateSerializer,
    OkpForumPostDeleteSerializer,
    OkpForumPostUpdateSerializer,
)


class OkpForumPostsView(ListAPIView):
    """
    Get forum posts, optionally filtered by topic slug
    """

    permission_classes = (AllowAny,)
    serializer_class = OkpForumPostListSerializer

    def get_queryset(self):
        queryset = OkpForumPost.objects.all()
        topic_id = self.kwargs.get("topic_id")
        if topic_id:
            queryset = queryset.filter(topic__id=topic_id).order_by("created_at")
        return queryset


class OkpForumPostCreateView(CreateAPIView):
    """
    Create a new forum post
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = OkpForumPostCreateSerializer


class OkpForumPostDeleteView(DestroyAPIView):
    """
    Delete a forum post
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = OkpForumPostDeleteSerializer
    queryset = OkpForumPost.objects.all()

    def perform_destroy(self, instance):
        topic = instance.topic
        is_first_post = topic.posts.order_by("created_at").first() == instance
        is_only_post = topic.total_posts == 1

        # Delete the post
        instance.delete()

        # If this was the first or only post, delete the topic too
        if is_first_post or is_only_post:
            topic.delete()


class OkpForumPostUpdateView(UpdateAPIView):
    """
    Update a forum post
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = OkpForumPostUpdateSerializer

    def get_object(self):
        return get_object_or_404(OkpForumPost, id=self.kwargs.get("pk"))
