from django.http import Http404
from django.utils.translation import gettext_lazy as _
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from okp.forums.models import (
    okpForumTopic
)
from okp.forums.serializers.topic import (
    okpForumTopicSerializer
)


class okpForumTopicView(RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = okpForumTopicSerializer
    lookup_field = "pk"

    def get_queryset(self):
        queryset = okpForumTopic.objects.filter(
            forum__is_active=True,
            forum__game__is_active=True
        ).select_related(
            "forum__game"
        )
        return queryset

    def get_object(self):
        queryset = self.get_queryset()
        queryset = queryset.filter(
            pk=self.kwargs[self.lookup_field]
        )

        obj = queryset.first()
        if obj is None:
            raise Http404(_("This topic doesn't exist."))
        self.check_object_permissions(self.request, obj)
        return obj
