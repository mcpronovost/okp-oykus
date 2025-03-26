from django.db import models
from django.utils.translation import gettext_lazy as _

from colorfield.fields import ColorField


class OkpGameTheme(models.Model):
    game = models.ForeignKey(
        "okp_game.OkpGame",
        on_delete=models.CASCADE,
        related_name="theme",
        verbose_name=_("Game"),
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        blank=False,
        null=False,
    )
    is_active = models.BooleanField(
        verbose_name=_("Is Active"),
        default=False,
        help_text=_("If the theme is active, it will be used for the game."),
    )
    # Colours
    primary = ColorField(
        verbose_name=_("Primary Colour"),
        blank=False,
        null=False,
    )
    core_bg = ColorField(
        verbose_name=_("Core Background Colour"),
        blank=False,
        null=False,
    )
    core_fg = ColorField(
        verbose_name=_("Core Text Colour"),
        blank=False,
        null=False,
    )
    core_link = ColorField(
        verbose_name=_("Core Link Colour"),
        blank=False,
        null=False,
    )
    core_border = ColorField(
        verbose_name=_("Core Border Colour"),
        blank=False,
        null=False,
    )
    core_header_bg = ColorField(
        verbose_name=_("Core Header Background Colour"),
        blank=False,
        null=False,
    )
    core_header_fg = ColorField(
        verbose_name=_("Core Header Text Colour"),
        blank=False,
        null=False,
    )
    core_elevated_bg = ColorField(
        verbose_name=_("Core Elevated Background Colour"),
        blank=False,
        null=False,
    )
    core_elevated_fg = ColorField(
        verbose_name=_("Core Elevated Text Colour"),
        blank=False,
        null=False,
    )
    card_bg = ColorField(
        verbose_name=_("Card Background Colour"),
        blank=False,
        null=False,
    )
    card_placeholder_bg = ColorField(
        verbose_name=_("Card Placeholder Background Colour"),
        blank=False,
        null=False,
    )
    card_placeholder_fg = ColorField(
        verbose_name=_("Card Placeholder Text Colour"),
        blank=False,
        null=False,
    )
    card_separator = ColorField(
        verbose_name=_("Card Separator Colour"),
        blank=False,
        null=False,
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
        db_index=True,
    )

    class Meta:
        verbose_name = _("Game Theme")
        verbose_name_plural = _("Game Themes")
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.is_active:
            OkpGameTheme.objects.filter(game=self.game).update(is_active=False)
        super().save(*args, **kwargs)
