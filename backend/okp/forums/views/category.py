from django.http import Http404
from django.utils.translation import gettext_lazy as _
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from okp.forums.models import (
    okpForumCategory
)
from okp.forums.serializers.category import (
    okpForumCategorySerializer
)


class okpForumCategoryView(RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = okpForumCategorySerializer
    lookup_field = "pk"

    def get_queryset(self):
        queryset = okpForumCategory.objects.filter(
            is_visible=True,
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
            raise Http404(_("This category doesn't exist."))
        self.check_object_permissions(self.request, obj)
        return obj
