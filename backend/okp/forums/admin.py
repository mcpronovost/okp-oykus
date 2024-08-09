from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from okp.forums.models import (
    okpForum,
    okpForumCategory,
    okpForumSection,
    okpForumTopic,
    okpForumMessage
)


@admin.register(okpForum)
class okpForumAdmin(admin.ModelAdmin):
    list_display = ["game", "is_active"]
    list_filter = ["is_active"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "game",
                "is_active"
            ]
        }),
    )


@admin.register(okpForumCategory)
class okpForumCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "forum", "is_visible"]
    list_filter = ["forum", "is_visible"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "forum",
                "name",
                "description",
            ]
        }),
        (_("Permissions"), {
            "fields": [
                "is_visible",
            ]
        }),
        (_("Informations"), {
            "fields": [
                "list_topics",
                "total_topics",
                "total_messages"
            ]
        }),
    )


@admin.register(okpForumSection)
class okpForumSectionAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "forum"]
    list_filter = ["forum", "is_visible"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "forum",
                "category",
                "section",
                "name",
                "description",
            ]
        }),
        (_("Permissions"), {
            "fields": [
                "is_visible"
            ]
        }),
        (_("Informations"), {
            "fields": [
                "list_topics",
                "total_topics",
                "total_messages"
            ]
        }),
    )


@admin.register(okpForumTopic)
class okpForumTopicAdmin(admin.ModelAdmin):
    list_display = ["forum", "category", "section", "author", "title"]
    readonly_fields = ["created_at", "updated_at"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "forum",
                "category",
                "section",
                "author",
                "title",
                "content",
                "total_messages",
            ]
        }),
        (_("Dates"), {
            "fields": [
                "created_at",
                "updated_at"
            ]
        }),
    )


@admin.register(okpForumMessage)
class okpForumMessageAdmin(admin.ModelAdmin):
    list_display = ["forum", "category", "section", "author", "topic"]
    readonly_fields = ["created_at", "updated_at"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "forum",
                "category",
                "section",
                "topic",
                "author",
                "content"
            ]
        }),
        (_("Dates"), {
            "fields": [
                "created_at",
                "updated_at"
            ]
        }),
    )
