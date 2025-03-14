from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from unfold.admin import ModelAdmin
from unfold.decorators import display

from okp.contrib.forum.models import OkpForumMessage

VISIBLE_STATUS = {
    _("Visible"): "success",
    _("Hidden"): "danger",
}


@admin.register(OkpForumMessage)
class OkpForumMessageAdmin(ModelAdmin):
    list_display = ("show_message", "forum", "category", "section", "topic", "show_is_visible")
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "slug")
    readonly_fields = ("created_at", "updated_at")

    @display(description=_("Message"), header=True)
    def show_message(self, obj):
        return obj.content

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
        (_("Content"), {
            "fields": (
                "content",
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
