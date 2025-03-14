from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from unfold.admin import ModelAdmin
from unfold.decorators import display

from okp.contrib.forum.models import OkpForumTopic

VISIBLE_STATUS = {
    _("Visible"): "success",
    _("Hidden"): "danger",
}

@admin.register(OkpForumTopic)
class OkpForumTopicAdmin(ModelAdmin):
    list_display = ("show_topic", "forum", "category", "section", "show_is_visible")
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "slug")
    readonly_fields = ("created_at", "updated_at")

    @display(description=_("Topic"), header=True)
    def show_topic(self, obj):
        return obj.title, obj.slug

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
                "title",
                "slug",
                "is_slug_auto",
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
