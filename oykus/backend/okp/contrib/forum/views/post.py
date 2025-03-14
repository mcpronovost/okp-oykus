from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView

from okp.contrib.forum.models import OkpForumPost
from okp.contrib.forum.serializers import (
    OkpForumPostListSerializer,
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
