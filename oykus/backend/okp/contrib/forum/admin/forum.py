from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from unfold.admin import ModelAdmin
from unfold.decorators import display

from okp.contrib.forum.models import OkpForum

ACTIVES_STATUS = {
    _("Active"): "success",
    _("Inactive"): "danger",
}

VISIBLE_STATUS = {
    _("Visible"): "success",
    _("Hidden"): "danger",
}


@admin.register(OkpForum)
class OkpForumAdmin(ModelAdmin):
    list_display = (
        "show_forum",
        "total_posts",
        "total_topics",
        "show_is_active",
        "show_is_visible",
    )
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "slug")
    readonly_fields = ("total_topics", "total_posts", "created_at", "updated_at")

    @display(description=_("Forum"), header=True)
    def show_forum(self, obj):
        return obj.title, obj.slug

    @display(
        description=_("Active"),
        ordering="is_active",
        label=ACTIVES_STATUS,
    )
    def show_is_active(self, obj):
        return _("Active") if obj.is_active else _("Inactive")

    @display(
        description=_("Visible"),
        ordering="is_visible",
        label=VISIBLE_STATUS,
    )
    def show_is_visible(self, obj):
        return _("Visible") if obj.is_visible else _("Hidden")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "game",
                    "title",
                    "slug",
                    "is_slug_auto",
                )
            },
        ),
        (
            _("Statistics"),
            {
                "fields": (
                    "total_topics",
                    "total_posts",
                ),
            },
        ),
        (
            _("Flags"),
            {
                "fields": (
                    "is_active",
                    "is_visible",
                ),
            },
        ),
        (_("Important Dates"), {"fields": ("created_at", "updated_at")}),
    )
