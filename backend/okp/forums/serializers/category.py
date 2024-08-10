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


class okpForumTopicSerializer(serializers.ModelSerializer):
    author = okpForumAuthorSerializer()

    class Meta:
        model = okpForumTopic
        fields = [
            "id", "author", "title", "created_at"
        ]


class okpForumMessageSerializer(serializers.ModelSerializer):
    author = okpForumAuthorSerializer()
    title = serializers.CharField(source="topic.title")

    class Meta:
        model = okpForumMessage
        fields = [
            "id", "author", "title", "created_at"
        ]


class okpForumSectionSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = okpForumSection
        fields = [
            "id", "name", "description", "path", "total_messages", "last_message"
        ]

    def get_last_message(self, obj):
        last_topic = obj.all_topics.first()
        last_message = obj.all_messages.last()
        if last_topic is None and last_message is None:
            return None
        if (
            last_message is None
            or last_message.created_at < last_topic.created_at
        ):
            return okpForumTopicSerializer(last_topic).data
        else:
            return okpForumMessageSerializer(last_message).data


class okpForumCategorySerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField()
    sections = serializers.SerializerMethodField()

    class Meta:
        model = okpForumCategory
        fields = [
            "id", "name", "description", "path", "breadcrumbs", "game", "sections"
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
