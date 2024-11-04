import math
from rest_framework import serializers

from okp.forums.models import (
    okpForumCategory,
    okpForumSection,
    okpForumTopic,
    okpForumMessage,
)


class okpForumTopicMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumMessage
        fields = ["id", "content", "created_at", "updated_at"]


class okpForumTopicSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()
    messages_pages = serializers.SerializerMethodField()

    class Meta:
        model = okpForumTopic
        fields = ["id", "name", "slug", "path", "messages", "messages_pages"]

    def get_messages(self, obj):
        show_messages = self.context.get("show_messages", False)
        if not show_messages:
            return []
        page = self.context.get("page", 1)
        size = self.context.get("size", 10)
        start = (page - 1) * size
        end = start + size
        messages = obj.messages.all()[start:end]
        return okpForumTopicMessageSerializer(messages, many=True).data

    def get_messages_pages(self, obj):
        show_messages = self.context.get("show_messages", False)
        if not show_messages:
            return 0
        size = self.context.get("size", 10)
        total_pages = math.ceil(obj.messages.count() / size)
        return int(total_pages)


class okpForumSectionTopicMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumMessage
        fields = ["id", "created_at", "updated_at"]


class okpForumSectionTopicSerializer(serializers.ModelSerializer):
    last_message = okpForumSectionTopicMessageSerializer(read_only=True)

    class Meta:
        model = okpForumTopic
        fields = ["id", "name", "slug", "path", "last_message",
                  "total_messages", "created_at", "updated_at"]


class okpForumSectionSerializer(serializers.ModelSerializer):
    topics = serializers.SerializerMethodField()
    topics_pages = serializers.SerializerMethodField()

    class Meta:
        model = okpForumSection
        fields = ["id", "name", "description", "slug", "path",
                  "topics", "topics_pages", "total_topics", "total_messages"]

    def get_topics(self, obj):
        show_topics = self.context.get("show_topics", False)
        if not show_topics:
            return []
        page = self.context.get("page", 1)
        size = self.context.get("size", 10)
        start = (page - 1) * size
        end = start + size
        topics = obj.topics.all()[start:end]
        return okpForumSectionTopicSerializer(topics, many=True).data

    def get_topics_pages(self, obj):
        show_topics = self.context.get("show_topics", False)
        if not show_topics:
            return 0
        size = self.context.get("size", 10)
        total_pages = math.ceil(obj.topics.count() / size)
        return int(total_pages)


class okpForumCategorySectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumSection
        fields = ["id", "name", "slug", "path", "banner", "banner_height", "basis", "total_topics",
                  "total_messages", "show_last_message", "show_last_topic"]


class okpForumsCategorySerializer(serializers.ModelSerializer):
    sections = okpForumCategorySectionSerializer(many=True)

    class Meta:
        model = okpForumCategory
        fields = ["id", "name", "slug", "path", "description", "sections"]
