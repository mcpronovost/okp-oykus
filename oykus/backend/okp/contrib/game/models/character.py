from django.contrib.auth import get_user_model
from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from okp.core.fields import OkpImageField
from okp.core.utils import get_abbr, get_slug
from okp.core.validators import okp_image_size_validator

User = get_user_model()


class OkpGameCharacter(models.Model):
    game = models.ForeignKey(
        "okp_game.OkpGame",
        on_delete=models.SET_NULL,
        related_name="characters",
        verbose_name=_("Game"),
        blank=True,
        null=True,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="characters",
        verbose_name=_("User"),
        blank=True,
        null=True,
    )
    # Identity
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=255,
    )
    slug = models.SlugField(
        verbose_name=_("Slug"),
        max_length=255,
        unique=True,
        blank=False,
        null=False,
    )
    is_slug_auto = models.BooleanField(
        verbose_name=_("Auto-Generate Slug"),
        default=True,
    )
    abbr = models.CharField(
        verbose_name=_("Abbreviation"),
        max_length=3,
        blank=True,
        null=False,
    )
    is_abbr_auto = models.BooleanField(
        verbose_name=_("Auto-Generate Abbreviation"),
        default=True,
    )
    avatar = OkpImageField(
        verbose_name=_("Avatar"),
        upload_to="characters/avatars",
        max_width=200,
        max_height=200,
        blank=True,
        null=True,
        validators=[
            okp_image_size_validator,
            FileExtensionValidator(
                allowed_extensions=["jpg", "jpeg", "png", "webp"]
            ),
        ],
    )
    # Flags
    is_active = models.BooleanField(
        verbose_name=_("Is Active"),
        default=True,
        help_text=_("Whether the character is active and can be used."),
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
        related_name="last_post_character",
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

    class Meta:
        verbose_name = _("Character")
        verbose_name_plural = _("Characters")
        ordering = ["name", "-updated_at", "-created_at"]

    def __str__(self):
        return self.name

    @cached_property
    def url(self):
        return f"{self.game.url}/{_("community")}/c{self.id}-{self.slug}"

    def save(self, *args, **kwargs):
        if self.is_slug_auto:
            self.slug = get_slug(self.name, self, OkpGameCharacter)
        if self.is_abbr_auto:
            self.abbr = get_abbr(self.name, 3)
        super().save(*args, **kwargs)
