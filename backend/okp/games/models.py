from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from okp.utils import get_abbr, get_slug


class OkpGame(models.Model):
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=255,
        unique=True,
        blank=False,
        null=False,
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
    # Status
    is_active = models.BooleanField(
        verbose_name=_("Is Active"),
        default=True,
    )
    is_public = models.BooleanField(
        verbose_name=_("Is Public"),
        default=False,
    )
    # Ownership
    founder = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="games_founded",
        verbose_name=_("Founder"),
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="games_owned",
        verbose_name=_("Owner"),
        blank=True,
        null=True,
    )
    # Counts
    total_players = models.PositiveIntegerField(
        verbose_name=_("Total Players"),
        default=0,
    )
    total_characters = models.PositiveIntegerField(
        verbose_name=_("Total Characters"),
        default=0,
    )
    # Important Dates
    created_at = models.DateTimeField(
        verbose_name=_("Created at"),
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated at"),
        auto_now=True,
    )

    class Meta:
        verbose_name = _("Game")
        verbose_name_plural = _("Games")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.is_abbr_auto:
            self.abbr = get_abbr(self.name)
        if self.is_slug_auto:
            self.slug = get_slug(self.name, self, OkpGame)
        super().save(*args, **kwargs)
