from rest_framework import serializers

from okp.games.models import okpGame
from okp.forums.models import (
    okpForumCategory,
    okpForumSection,
    okpForumTopic
)


class okpForumGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = [
            "id", "name", "slug", "founder", "owner"
        ]


class okpForumCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumCategory
        fields = [
            "id", "name", "description", "path",
        ]


class okpForumTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumTopic
        fields = [
            "id", "title", "total_messages", "path"
        ]


class okpForumSectionSerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    sections = serializers.SerializerMethodField()
    topics = serializers.SerializerMethodField()

    class Meta:
        model = okpForumSection
        fields = [
            "id", "name", "description", "path", "breadcrumbs", "game", "category", "sections", "topics"
        ]

    def get_game(self, obj):
        game = obj.forum.game
        return okpForumGameSerializer(game).data

    def get_category(self, obj):
        category = obj.category
        return okpForumCategorySerializer(category).data

    def get_sections(self, obj):
        sections = obj.sections.filter(
            is_visible=True
        )
        return okpForumSectionSerializer(sections, many=True).data

    def get_topics(self, obj):
        topics = obj.topics.all()
        return okpForumTopicSerializer(topics, many=True).data
