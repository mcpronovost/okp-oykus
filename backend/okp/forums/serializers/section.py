from rest_framework import serializers

from okp.games.models import (
    okpGame,
    okpGameCharacter
)
from okp.forums.models import (
    okpForumCategory,
    okpForumSection,
    okpForumTopic,
    okpForumMessage
)


class okpForumAuthorSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = okpGameCharacter
        fields = [
            "id", "name", "avatar"
        ]

    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return None


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


class okpForumMessageSerializer(serializers.ModelSerializer):
    author = okpForumAuthorSerializer()

    class Meta:
        model = okpForumMessage
        fields = [
            "id", "author", "created_at"
        ]


class okpForumTopicSerializer(serializers.ModelSerializer):
    author = okpForumAuthorSerializer()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = okpForumTopic
        fields = [
            "id", "title", "author", "path", "total_messages", "last_message", "created_at"
        ]

    def get_last_message(self, obj):
        last = obj.messages.last()
        if last is None:
            return None
        return okpForumMessageSerializer(last).data


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
