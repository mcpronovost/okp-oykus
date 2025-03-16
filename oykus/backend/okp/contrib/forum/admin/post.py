from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from unfold.admin import ModelAdmin
from unfold.decorators import display

from okp.contrib.forum.models import OkpForumPost

VISIBLE_STATUS = {
    _("Visible"): "success",
    _("Hidden"): "danger",
}


@admin.register(OkpForumPost)
class OkpForumPostAdmin(ModelAdmin):
    list_display = ("show_post", "forum", "show_is_visible")
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "slug")
    readonly_fields = ("created_at", "updated_at")

    @display(description=_("Post"), header=True)
    def show_post(self, obj):
        c = f"{obj.category.truncated_title} - " if obj.category else ""
        s = f"{obj.section.truncated_title} - " if obj.section else ""
        t = f"{obj.topic.truncated_title}" if obj.topic else ""
        return (
            f"{obj.truncated_message}",
            f"{c}{s}{t}",
        )

    @display(
        description=_("Visible"),
        ordering="is_visible",
        label=VISIBLE_STATUS,
    )
    def show_is_visible(self, obj):
        return _("Visible") if obj.is_visible else _("Hidden")

    fieldsets = (
        (None, {
            "fields": (
                "game",
                "forum",
                "category",
                "section",
                "topic",
            )
        }),
        (_("Author"), {
            "fields": (
                "user",
                "character",
            )
        }),
        (_("Content"), {
            "fields": (
                "message",
            )
        }),
        (_("Flags"), {
            "fields": (
                "is_visible",
            ),
        }),
        (_("Important Dates"), {
            "fields": ("created_at", "updated_at")
        }),
    )
