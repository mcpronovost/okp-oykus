from django.http import Http404
from django.utils.translation import gettext_lazy as _
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from okp.games.models import (
    okpGame
)
from okp.games.serializers import (
    okpGameSideSerializer
)


class okpGameSidePopularView(ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = okpGameSideSerializer

    def get_queryset(self):
        queryset = okpGame.objects.filter(
            is_active=True,
        )[0:5]
        return queryset
