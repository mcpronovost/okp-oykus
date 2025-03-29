from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from okp.contrib.game.models import OkpGame


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
