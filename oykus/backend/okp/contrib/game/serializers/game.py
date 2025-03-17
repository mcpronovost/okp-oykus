from rest_framework import serializers

from okp.contrib.auth.serializers import OkpUserSerializer
from okp.contrib.game.models import OkpGame


class OkpGameSerializer(serializers.ModelSerializer):
    owner = OkpUserSerializer(read_only=True)

    class Meta:
        model = OkpGame
        fields = ("id", "title", "slug", "owner", "created_at", "updated_at")


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
        from okp.contrib.forum.serializers.category import OkpForumCategorySerializer  # noqa

        category = obj.forum.categories.get(pk=self.context["category_id"])
        return OkpForumCategorySerializer(category).data


class OkpGameForumSectionSerializer(OkpGameSerializer):
    section = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = OkpGameSerializer.Meta.fields + ("section",)

    def get_section(self, obj):
        from okp.contrib.forum.serializers.section import OkpForumSectionSerializer  # noqa

        section = obj.forum.sections.get(pk=self.context["section_id"])
        return OkpForumSectionSerializer(section).data


class OkpGameForumTopicSerializer(OkpGameSerializer):
    topic = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = OkpGameSerializer.Meta.fields + ("topic",)

    def get_topic(self, obj):
        from okp.contrib.forum.serializers.topic import OkpForumTopicSerializer  # noqa

        topic = obj.forum.topics.get(pk=self.context["topic_id"])
        context = {
            "view": self.context.get("view"),
            "request": self.context.get("request"),
        }
        return OkpForumTopicSerializer(topic, context=context).data
