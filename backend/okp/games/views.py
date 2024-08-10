from django.http import Http404
from django.utils.translation import gettext_lazy as _
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from okp.games.models import (
    okpGame
)
from okp.games.serializers import (
    okpGameSerializer,
    okpGameSideSerializer
)


class okpGameView(RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = okpGameSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = okpGame.objects.filter(
            is_active=True
        )
        return queryset

    def get_object(self):
        queryset = self.get_queryset()
        queryset = queryset.filter(
            slug=self.kwargs[self.lookup_field]
        )

        obj = queryset.first()
        if obj is None:
            raise Http404(_("This forum doesn't exist."))
        self.check_object_permissions(self.request, obj)
        return obj


class okpGameSidePopularView(ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = okpGameSideSerializer

    def get_queryset(self):
        queryset = okpGame.objects.filter(
            is_active=True,
        )[0:5]
        return queryset
