import json
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from okp.core.views import OkpPageView
from okp.contrib.game.models import OkpGame, OkpGameCharacter
from okp.contrib.game.serializers import OkpGameSerializer, OkpGameCharacterSerializer


class OkpGameCommunityCharacterProfileView(OkpPageView):
    model = OkpGame
    serializer_class = OkpGameSerializer
    key = "slug"
    page_title_field = "title"
    page_favicon_field = "favicon"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        character = get_object_or_404(OkpGameCharacter, id=self.kwargs.get("character_id"))
        character_data = OkpGameCharacterSerializer(character).data

        initial_data = json.loads(context.get("initial_data", "{}"))
        initial_data["character"] = character_data
        context["initial_data"] = json.dumps(initial_data)

        return context

    def get_page_title(self, obj):
        character = get_object_or_404(OkpGameCharacter, id=self.kwargs.get("character_id"))
        return f"{character.name} - {obj.get('title')}"
