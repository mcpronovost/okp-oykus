from django.db import models
from django.utils.translation import gettext_lazy as _

from okp.contrib.game.models import OkpGame

from .forum import OkpForum
from .category import OkpForumCategory
from .section import OkpForumSection
from .topic import OkpForumTopic


class OkpForumPost(models.Model):
    game = models.ForeignKey(
        OkpGame,
        on_delete=models.CASCADE,
        related_name="posts",
        verbose_name=_("Game"),
        blank=False,
        null=False,
    )
    forum = models.ForeignKey(
        OkpForum,
        on_delete=models.CASCADE,
        related_name="posts",
        verbose_name=_("Forum"),
        blank=False,
        null=False,
    )
    category = models.ForeignKey(
        OkpForumCategory,
        on_delete=models.SET_NULL,
        related_name="posts",
        verbose_name=_("Category"),
        blank=True,
        null=True,
    )
    section = models.ForeignKey(
        OkpForumSection,
        on_delete=models.SET_NULL,
        related_name="posts",
        verbose_name=_("Section"),
        blank=True,
        null=True,
    )
    topic = models.ForeignKey(
        OkpForumTopic,
        on_delete=models.CASCADE,
        related_name="posts",
        verbose_name=_("Topic"),
    )
    # Content
    message = models.TextField(
        verbose_name=_("Message"),
        blank=False,
        null=False,
    )
    # Flags
    is_visible = models.BooleanField(
        verbose_name=_("Is Visible"),
        default=True,
        help_text=_("Whether the message is visible to users."),
    )
    # Important Dates
    created_at = models.DateTimeField(
        verbose_name=_("Created At"),
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated At"),
        auto_now=True,
    )

    class Meta:
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")
        ordering = ["-created_at"]

    def __str__(self):
        return f"\"{self.message[:100]}{'...' if len(self.message) > 100 else ''}\""
