from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html

from okp.forums.models import (
    okpForumCategory,
    okpForumSection,
    okpForumTopic,
    okpForumMessage,
)


@admin.register(okpForumCategory)
class okpForumCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "game", "sortby"]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["name"]
    list_filter = [
        ("game", admin.RelatedOnlyFieldListFilter)
    ]


@admin.register(okpForumSection)
class okpForumSectionAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "game",
                    "total_messages", "total_topics", "sortby"]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["name"]
    list_filter = [
        ("game", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter)
    ]


@admin.register(okpForumTopic)
class okpForumTopicAdmin(admin.ModelAdmin):
    list_display = ["get_title", "user", "character", "last_message", "section",
                    "category", "game", "total_messages"]
    readonly_fields = ["get_title", "get_path", "slug",
                       "total_messages", "created_at", "updated_at"]
    search_fields = ["name"]
    list_filter = [
        ("user", admin.RelatedOnlyFieldListFilter),
        ("character", admin.RelatedOnlyFieldListFilter),
        ("game", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter),
        ("section", admin.RelatedOnlyFieldListFilter)
    ]
    fieldsets = [
        (_("Title"), {"fields": ["name", "slug", "get_path"]}),
        (_("Author"), {"fields": ["user", "character"]}),
        (_("Forum"), {"fields": ["game", "category", "section"]}),
        (_("Statistics"), {"fields": ["total_messages"]}),
        (_("Important dates"), {"fields": ["created_at", "updated_at"]})
    ]

    @admin.display(description=_("Title"))
    def get_title(self, obj):
        return f"{obj.name[:32]}..." if len(obj.name) > 32 else obj.name

    @admin.display(description=_("Path"))
    def get_path(self, obj):
        return format_html("<a href='{url}' target='_blank'>{url}</a>", url=obj.path)


@admin.register(okpForumMessage)
class okpForumMessageAdmin(admin.ModelAdmin):
    list_display = ["__str__", "user", "character",
                    "get_topic", "section", "category", "game"]
    readonly_fields = ["get_topic", "created_at", "updated_at"]
    search_fields = ["topic__name"]
    list_filter = [
        ("user", admin.RelatedOnlyFieldListFilter),
        ("character", admin.RelatedOnlyFieldListFilter),
        ("game", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter),
        ("section", admin.RelatedOnlyFieldListFilter)
    ]
    fieldsets = [
        (_("Content"), {"fields": ["topic", "content"]}),
        (_("Author"), {"fields": ["user", "character"]}),
        (_("Forum"), {"fields": ["game", "category", "section"]}),
        (_("Important dates"), {"fields": ["created_at", "updated_at"]})
    ]

    @admin.display(description=_("Topic"))
    def get_topic(self, obj):
        return f"{obj.topic.name[:32]}..." if len(obj.topic.name) > 32 else obj.topic.name
