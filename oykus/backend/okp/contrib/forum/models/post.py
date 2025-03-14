from django.contrib.auth import get_user_model
from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _

from okp.contrib.game.models import OkpGame, OkpGameCharacter

from .forum import OkpForum
from .category import OkpForumCategory
from .section import OkpForumSection
from .topic import OkpForumTopic


User = get_user_model()


class OkpForumPostManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().select_related(
            "topic",
            "section",
            "category",
            "game",
            "forum",
            "user",
            "character",
        )
        # TODO: Add tags and reactions M2M
        # .prefetch_related(
        #     "tags",  # if you have tags
        #     "reactions",  # if you have reactions
        # )


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
    # Author
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="posts",
        verbose_name=_("User"),
        blank=True,
        null=True,
    )
    character = models.ForeignKey(
        OkpGameCharacter,
        on_delete=models.SET_NULL,
        related_name="posts",
        verbose_name=_("Character"),
        blank=True,
        null=True,
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
        db_index=True,
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated At"),
        auto_now=True,
    )

    class Meta:
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["-created_at"]),
            models.Index(fields=["topic", "is_visible", "-created_at"]),
        ]

    @cached_property
    def truncated_message(self):
        if len(self.message) <= 100:
            return self.message
        return f"{self.message[:100]}..."

    def __str__(self):
        return f"\"{self.truncated_message}\""

    def save(self, *args, **kwargs):
        is_new = self.pk is None

        # Set related fields
        if self.topic:
            self.section = self.topic.section
            self.category = self.topic.section.category
            self.forum = self.topic.section.category.forum
            self.game = self.topic.section.category.game

        # Update topic post count
        if is_new:
            self.topic.total_posts = self.topic.posts.count()
            self.topic.save(update_fields=["total_posts"])

        super().save(*args, **kwargs)
