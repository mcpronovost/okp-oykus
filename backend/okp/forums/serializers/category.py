from rest_framework import serializers

from okp.games.models import okpGame
from okp.forums.models import (
    okpForumCategory,
    okpForumSection
)


class okpForumGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = [
            "id", "name", "slug", "founder", "owner"
        ]


class okpForumSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumSection
        fields = [
            "id", "name", "description", "path"
        ]


class okpForumCategorySerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField()
    sections = serializers.SerializerMethodField()

    class Meta:
        model = okpForumCategory
        fields = [
            "id", "name", "description", "path", "game", "sections"
        ]

    def get_game(self, obj):
        game = obj.forum.game
        return okpForumGameSerializer(game).data

    def get_sections(self, obj):
        sections = obj.sections.filter(
            section=None,
            is_visible=True
        )
        return okpForumSectionSerializer(sections, many=True).data
