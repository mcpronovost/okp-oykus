import json

from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from okp.core.views import OkpPageView
from okp.contrib.game.models import OkpGame


class OkpAuthGamesView(OkpPageView):
    permission_classes = (IsAuthenticated,)
    page_title_field = "title"

    def get_context_data(self, **kwargs):
        user = self.request.user
        context = self.get_pre_context(**kwargs)

        games = [{
            "id": game.id,
            "title": game.title,
            "total_users": game.forum.total_users if hasattr(game, "forum") else 0,
            "total_characters": game.forum.total_characters if hasattr(game, "forum") else 0,
            "total_topics": game.forum.total_topics if hasattr(game, "forum") else 0,
            "total_posts": game.forum.total_posts if hasattr(game, "forum") else 0,
            "is_active": game.is_active,
            "is_public": game.is_public,
            "created_at": game.created_at.isoformat(),
            "updated_at": game.updated_at.isoformat(),
        } for game in user.games.all().order_by("-updated_at")]

        context["initial_data"] = json.dumps({
            "games": games,
            "user": {
                "max_owned_games": user.max_owned_games,
                "total_owned_games": user.games.count(),
            }
        })

        return context


class OkpAuthGamesEditView(OkpPageView):
    permission_classes = (IsAuthenticated,)
    page_title_field = "title"

    def get_context_data(self, **kwargs):
        user = self.request.user
        game_id = kwargs.get("game_id")
        game = get_object_or_404(OkpGame, id=game_id, owner=user)

        context = self.get_pre_context(**kwargs)

        context["initial_data"] = json.dumps({
            "game": {
                "id": game.id,
                "title": game.title,
                "abbr": game.abbr,
                "subtitle": game.subtitle,
                "slug": game.slug,
                "logo": game.logo.url if game.logo else None,
                "cover": game.cover.url if game.cover else None,
                "is_active": game.is_active,
                "is_public": game.is_public,
                "primary": game.primary,
                "created_at": game.created_at.isoformat(),
                "updated_at": game.updated_at.isoformat(),
            }
        })

        return context
