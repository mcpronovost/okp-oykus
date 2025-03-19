from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView, ListAPIView

from okp.contrib.forum.models import OkpForumPost
from okp.contrib.forum.serializers import (
    OkpForumPostListSerializer,
    OkpForumPostCreateSerializer,
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

    permission_classes = (AllowAny,)
    serializer_class = OkpForumPostCreateSerializer

    def perform_create(self, serializer):
        topic = serializer.validated_data.get("topic")
        if not topic:
            raise ValidationError({"topic": "Topic does not exist."})
        if topic.is_locked:
            raise ValidationError({"topic": "Cannot create posts in a locked topic."})
        serializer.save()
