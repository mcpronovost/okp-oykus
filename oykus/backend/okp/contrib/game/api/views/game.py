from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from okp.contrib.game.models import OkpGame
from okp.contrib.game.serializers import OkpGameUpdateSerializer


class OkpGameSidePopularView(ListAPIView):
    """
    Get popular games for the game sider
    """

    permission_classes = (AllowAny,)
    # serializer_class = OkpForumTopicSerializer
    queryset = OkpGame.objects.filter(
        is_active=True,
        is_public=True,
    ).order_by(
        "-updated_at"
    )[:10]

    def list(self, request, *args, **kwargs):
        instance = self.get_queryset()
        games = []
        for game in instance:
            games.append(
                {
                    "id": game.id,
                    "title": game.title,
                    "slug": game.slug,
                    "abbr": game.abbr,
                    "logo": game.logo.url if game.logo else None,
                    "url": game.url,
                    "primary": game.primary,
                }
            )
        return Response({"games": games})


class OkpGameUpdateView(UpdateAPIView):
    """
    Update a game
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = OkpGameUpdateSerializer

    def get_object(self):
        return get_object_or_404(OkpGame, id=self.kwargs.get("pk"))
