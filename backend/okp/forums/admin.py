from django.contrib import admin
from django.utils.translation import gettext_lazy as _

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
    list_display = ["name", "category", "game", "total_messages", "total_topics", "sortby"]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["name"]
    list_filter = [
        ("game", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter)
    ]


@admin.register(okpForumTopic)
class okpForumTopicAdmin(admin.ModelAdmin):
    list_display = ["name", "last_message", "section", "category", "game", "total_messages"]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["name"]
    list_filter = [
        ("game", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter),
        ("section", admin.RelatedOnlyFieldListFilter)
    ]


@admin.register(okpForumMessage)
class okpForumMessageAdmin(admin.ModelAdmin):
    list_display = ["__str__", "topic", "section", "category", "game"]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["topic__name"]
    list_filter = [
        ("game", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter),
        ("section", admin.RelatedOnlyFieldListFilter)
    ]