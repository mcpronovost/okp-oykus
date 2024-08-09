from rest_framework import serializers

from okp.games.models import okpGame
from okp.forums.models import (
    okpForumCategory,
    okpForumSection,
    okpForumTopic,
    okpForumMessage
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


class okpForumSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumSection
        fields = [
            "id", "name", "description", "path"
        ]


class okpForumMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumMessage
        fields = [
            "id", "content"
        ]


class okpForumTopicSerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    section = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()

    class Meta:
        model = okpForumTopic
        fields = [
            "id", "title", "content", "total_messages", "path", "breadcrumbs", "game", "category", "section", "messages"
        ]

    def get_game(self, obj):
        game = obj.forum.game
        return okpForumGameSerializer(game).data

    def get_category(self, obj):
        category = obj.category
        return okpForumCategorySerializer(category).data

    def get_section(self, obj):
        section = obj.section
        return okpForumSectionSerializer(section).data

    def get_messages(self, obj):
        messages = obj.messages.all()
        return okpForumMessageSerializer(messages, many=True).data
