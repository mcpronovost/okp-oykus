from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from okp.contrib.forum.models import OkpForumTopic, OkpForumPost
from okp.contrib.forum.serializers import (
    OkpForumTopicSerializer,
    OkpForumPostListSerializer,
)


class OkpForumTopicView(RetrieveAPIView):
    """
    Get forum topic
    """

    permission_classes = (AllowAny,)
    serializer_class = OkpForumTopicSerializer
    queryset = OkpForumTopic.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        topic_data = self.get_serializer(instance).data

        # Get paginated posts
        posts = OkpForumPost.objects.filter(
            topic_id=instance.id
        ).order_by("created_at")

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(posts, request)
        posts_data = OkpForumPostListSerializer(page, many=True).data

        return Response({
            **topic_data,
            "posts": posts_data,
            "pagination": {
                "count": paginator.page.paginator.count,
                "page": paginator.page.number,
                "next": paginator.get_next_link(),
                "previous": paginator.get_previous_link(),
            }
        })
