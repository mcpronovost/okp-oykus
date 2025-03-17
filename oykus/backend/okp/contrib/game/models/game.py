from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from okp.core.utils import get_abbr, get_slug

User = get_user_model()


class OkpGame(models.Model):
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
    # Ownership
    founder = models.CharField(
        verbose_name=_("Founder"),
        max_length=255,
        blank=True,
        null=True,
    )
    founder_link = models.URLField(
        verbose_name=_("Founder Link"),
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(
        User,
        verbose_name=_("Owner"),
        on_delete=models.SET_NULL,
        related_name="games",
        blank=True,
        null=True,
    )
    # Important Dates
    founded_at = models.DateField(
        verbose_name=_("Founded At"),
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created At"),
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated At"),
        auto_now=True,
    )

    class Meta:
        verbose_name = _("Game")
        verbose_name_plural = _("Games")
        ordering = ["title", "-updated_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.is_slug_auto:
            self.slug = get_slug(self.title, self, OkpGame)
        if self.is_abbr_auto:
            self.abbr = get_abbr(self.title, 3)
        super().save(*args, **kwargs)
