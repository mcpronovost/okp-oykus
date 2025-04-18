from rest_framework import serializers

from okp.contrib.auth.serializers import OkpUserSerializer
from okp.contrib.game.models import OkpGame
from okp.contrib.game.serializers.theme import OkpGameThemeSerializer


class OkpGameSerializer(serializers.ModelSerializer):
    owner = OkpUserSerializer(read_only=True)
    theme = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = (
            "id",
            "title",
            "slug",
            "abbr",
            "subtitle",
            "logo",
            "favicon",
            "cover",
            "owner",
            "theme",
            "created_at",
            "updated_at",
        )

    def get_theme(self, obj):
        theme = obj.theme.filter(is_active=True).first()
        if theme:
            return OkpGameThemeSerializer(theme).data
        return None


class OkpGameForumIndexSerializer(OkpGameSerializer):
    forum = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = OkpGameSerializer.Meta.fields + ("forum",)

    def get_forum(self, obj):
        from okp.contrib.forum.serializers.forum import OkpForumIndexSerializer

        return OkpForumIndexSerializer(obj.forum).data


class OkpGameForumCategorySerializer(OkpGameSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = OkpGameSerializer.Meta.fields + ("category",)

    def get_category(self, obj):
        from okp.contrib.forum.serializers.category import (
            OkpForumCategorySerializer,
        )  # noqa

        category = obj.forum.categories.get(pk=self.context["category_id"])
        return OkpForumCategorySerializer(category).data


class OkpGameForumSectionSerializer(OkpGameSerializer):
    section = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = OkpGameSerializer.Meta.fields + ("section",)

    def get_section(self, obj):
        from okp.contrib.forum.serializers.section import (
            OkpForumSectionSerializer,
        )  # noqa

        section = obj.forum.sections.filter(pk=self.context["section_id"]).first()
        if section:
            return OkpForumSectionSerializer(section).data
        return None


class OkpGameForumTopicSerializer(OkpGameSerializer):
    topic = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = OkpGameSerializer.Meta.fields + ("topic",)

    def get_topic(self, obj):
        from okp.contrib.forum.serializers.topic import (
            OkpForumTopicSerializer,
        )  # noqa

        topic = obj.forum.topics.get(pk=self.context["topic_id"])
        context = {
            "view": self.context.get("view"),
            "request": self.context.get("request"),
        }
        return OkpForumTopicSerializer(topic, context=context).data


class OkpGameCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a new game"""

    class Meta:
        model = OkpGame
        fields = ("id", "title", "subtitle")
        read_only_fields = ("id",)

    def create(self, validated_data):
        validated_data["owner"] = self.context["request"].user
        validated_data["is_public"] = False
        game = super().create(validated_data)

        # Create forum
        OkpForum = (
            self.context["view"]
            .get_serializer()
            .Meta.model._meta.apps.get_model("okp_forum", "OkpForum")
        )

        OkpForum.objects.create(
            title=game.title,
            game=game,
        )

        return game


class OkpGameUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating a game"""

    class Meta:
        model = OkpGame
        fields = ("id", "title", "slug", "abbr", "subtitle", "logo", "cover", "is_public")
        read_only_fields = ("id", "abbr")

    def validate(self, data):
        request = self.context.get("request")
        game = self.instance

        if not game:
            raise serializers.ValidationError({"game": "Game does not exist."})
        if game.owner != request.user:
            raise serializers.ValidationError({"game": "Game does not belong to you."})

        return data
