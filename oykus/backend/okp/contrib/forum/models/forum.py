from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _

from okp.core.utils import get_slug
from okp.contrib.game.models import OkpGame


class OkpForumManager(models.Manager):
    def index(self):
        return self.select_related(
            "last_post",
            "last_post__topic",
            "last_post__character",
            "last_post__user",
        )


class OkpForum(models.Model):
    game = models.OneToOneField(
        OkpGame,
        verbose_name=_("Game"),
        on_delete=models.SET_NULL,
        related_name="forum",
        blank=True,
        null=True,
    )
    title = models.CharField(
        verbose_name=_("Title"),
        max_length=255,
        blank=False,
        null=False,
    )
    slug = models.SlugField(
        verbose_name=_("Slug"),
        max_length=255,
        unique=True,
        blank=True,
        null=False,
    )
    is_slug_auto = models.BooleanField(
        verbose_name=_("Auto-Generate Slug"),
        default=True,
    )
    # Flags
    is_active = models.BooleanField(
        verbose_name=_("Is Active"),
        default=True,
        help_text=_("Whether the forum is active and can be used."),
    )
    is_visible = models.BooleanField(
        verbose_name=_("Is Visible"),
        default=True,
        help_text=_("Whether the forum is visible to users."),
    )
    # Statistics
    total_posts = models.IntegerField(
        verbose_name=_("Total Posts"),
        default=0,
    )
    total_topics = models.IntegerField(
        verbose_name=_("Total Topics"),
        default=0,
    )
    last_post = models.ForeignKey(
        "okp_forum.OkpForumPost",
        verbose_name=_("Last Post"),
        on_delete=models.SET_NULL,
        related_name="last_post_forum",
        blank=True,
        null=True,
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

    objects = OkpForumManager()

    class Meta:
        verbose_name = _("Forum")
        verbose_name_plural = _("Forums")
        ordering = ["title", "-updated_at", "-created_at"]

    def __str__(self):
        return self.title

    @cached_property
    def url(self):
        g = f"/g/{self.game.slug}"
        return f"{g}/"

    def save(self, *args, **kwargs):
        if self.is_slug_auto:
            self.slug = get_slug(self.title, self, OkpForum)
        super().save(*args, **kwargs)
