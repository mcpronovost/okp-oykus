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
    list_filter = [
        "is_visible",
        ("forum", admin.RelatedOnlyFieldListFilter)
    ]
    search_fields = ["name"]
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
                "order_by",
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
    list_display = ["name", "section", "category", "forum"]
    list_filter = [
        "is_visible",
        ("forum", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter),
        ("section", admin.RelatedOnlyFieldListFilter)
    ]
    search_fields = ["name"]
    readonly_fields = ["total_topics", "total_messages"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "forum",
                "category",
                "section",
                "order_by"
            ]
        }),
        (_("General"), {
            "fields": [
                "name",
                "description",
                "cover"
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
    list_filter = [
        ("forum", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter),
        ("section", admin.RelatedOnlyFieldListFilter)
    ]
    search_fields = ["title", "author__name"]
    readonly_fields = ["total_messages", "created_at", "updated_at"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "forum",
                "category",
                "section",
            ]
        }),
        (_("Content"), {
            "fields": [
                "author",
                "title",
                "content",
            ]
        }),
        (_("Informations"), {
            "fields": [
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
    list_display = ["topic", "author", "section", "category", "forum"]
    list_filter = [
        ("forum", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter),
        ("section", admin.RelatedOnlyFieldListFilter),
        ("topic", admin.RelatedOnlyFieldListFilter)
    ]
    search_fields = ["topic__title", "author__name"]
    readonly_fields = ["created_at", "updated_at"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "forum",
                "category",
                "section",
                "topic"
            ]
        }),
        (_("General"), {
            "fields": [
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
