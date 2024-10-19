from django.db.models import Prefetch
from django.http import Http404
from django.utils.translation import gettext_lazy as _
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from okp.forums.models import (
    okpForum,
    okpForumCategory,
    okpForumSection,
    okpForumTopic,
    okpForumMessage
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
        ).prefetch_related(
            Prefetch(
                "categories",
                okpForumCategory.objects.filter(
                    is_visible=True
                ).select_related(
                    "forum",
                    "forum__game"
                ).prefetch_related(
                    Prefetch(
                        "sections",
                        okpForumSection.objects.filter(
                            section=None,
                            is_visible=True
                        ).select_related(
                            "forum",
                            "forum__game"
                        ).prefetch_related(
                            Prefetch(
                                "topics",
                                okpForumTopic.objects.all()
                            ),
                            Prefetch(
                                "messages",
                                okpForumMessage.objects.all()
                            )
                        )
                    )
                )
            )
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
