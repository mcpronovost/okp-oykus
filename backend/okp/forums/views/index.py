from django.http import Http404
from django.utils.translation import gettext_lazy as _
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from okp.forums.models import (
    okpForum
)
from okp.forums.serializers.index import (
    okpForumIndexSerializer
)


class okpForumIndex(RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = okpForumIndexSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = okpForum.objects.filter(
            is_active=True,
            game__is_active=True
        ).select_related(
            "game"
        )
        return queryset

    def get_object(self):
        queryset = self.get_queryset()
        queryset = queryset.filter(
            game__slug=self.kwargs[self.lookup_field]
        )

        obj = queryset.first()
        if obj is None:
            raise Http404(_("This forum doesn't exist."))
        self.check_object_permissions(self.request, obj)
        return obj
