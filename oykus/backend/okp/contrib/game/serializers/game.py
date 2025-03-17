from rest_framework import serializers

from okp.contrib.forum.models import (
    OkpForumCategory,
    OkpForumSection,
    OkpForumTopic,
)

from okp.contrib.game.models import OkpGame


class OkpGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpGame
        fields = ("id", "title", "slug")


class OkpGameForumIndexSerializer(OkpGameSerializer):
    forum = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = ("id", "title", "slug", "forum")

    def get_forum(self, obj):
        from okp.contrib.forum.serializers.forum import OkpForumIndexSerializer
        return OkpForumIndexSerializer(obj.forum).data


class OkpGameForumCategorySerializer(OkpGameSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = ("id", "title", "slug", "category")

    def get_category(self, obj):
        from okp.contrib.forum.serializers.category import OkpForumCategorySerializer  # noqa

        category = OkpForumCategory.objects.get(pk=self.context["category_id"])
        return OkpForumCategorySerializer(category).data


class OkpGameForumSectionSerializer(OkpGameSerializer):
    section = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = ("id", "title", "slug", "section")

    def get_section(self, obj):
        from okp.contrib.forum.serializers.section import OkpForumSectionSerializer  # noqa

        section = OkpForumSection.objects.get(pk=self.context["section_id"])
        return OkpForumSectionSerializer(section).data


class OkpGameForumTopicSerializer(OkpGameSerializer):
    topic = serializers.SerializerMethodField()

    class Meta:
        model = OkpGame
        fields = ("id", "title", "slug", "topic")

    def get_topic(self, obj):
        from okp.contrib.forum.serializers.topic import OkpForumTopicSerializer  # noqa

        topic = obj.topics.get(pk=self.context["topic_id"])
        context = {
            "view": self.context.get("view"),
            "request": self.context.get("request"),
        }
        return OkpForumTopicSerializer(topic, context=context).data
