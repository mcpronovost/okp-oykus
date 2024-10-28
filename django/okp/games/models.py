from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import F
from django.utils.translation import gettext_lazy as _
from colorfield.fields import ColorField

from okp.utils import get_unique_slug


class okpGame(models.Model):
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=120,
        blank=False,
        null=False
    )
    slug = models.SlugField(
        verbose_name=_("Slug"),
        max_length=120,
        unique=True,
        blank=True,
        null=True
    )
    founder = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        related_name="games_as_founder",
        verbose_name=_("Founder"),
        blank=True,
        null=True
    )
    owner = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        related_name="games_as_owner",
        verbose_name=_("Owner"),
        blank=True,
        null=True
    )
    version = models.CharField(
        verbose_name=_("Version"),
        default="0.1.0",
        blank=False,
        null=False
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created"),
        auto_now_add=True,
        editable=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Game")
        verbose_name_plural = _("Games")
        ordering = ["-updated_at", "name"]

    def __str__(self):
        return f"{self.name}"

    @property
    def abbr(self):
        return "".join([x[0] for x in self.name.split()[:2]]).upper()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = get_unique_slug(self.name, okpGame)
        return super().save(*args, **kwargs)


class okpGameTheme(models.Model):
    game = models.OneToOneField(
        okpGame,
        on_delete=models.SET_NULL,
        related_name="theme",
        verbose_name=_("Game"),
        blank=True,
        null=True
    )
    # =-
    core_primary = ColorField(
        verbose_name=_("Default Primary Colour"),
        default="#d3b018",
        blank=False,
        null=False
    )
    core_bg = ColorField(
        verbose_name=_("Default Background Colour"),
        default="#c9cfd1",
        blank=False,
        null=False
    )
    core_text = ColorField(
        verbose_name=_("Default Text Colour"),
        default="#435259",
        blank=False,
        null=False
    )
    # =-
    core_head_bg = ColorField(
        verbose_name=_("Core Head Background Colour"),
        default="#435259",
        blank=False,
        null=False
    )
    core_head_text = ColorField(
        verbose_name=_("Core Head Text Colour"),
        default="#c9cfd1",
        blank=False,
        null=False
    )
    # =-
    core_sideleft_bg = ColorField(
        verbose_name=_("Core Sideleft Background Colour"),
        default="#dbe0e2",
        blank=False,
        null=False
    )
    core_sideleft_text = ColorField(
        verbose_name=_("Core Sideleft Text Colour"),
        default="#435259",
        blank=False,
        null=False
    )
    core_sideleft_mask_bg = ColorField(
        verbose_name=_("Core Sideleft Mask Background Colour"),
        default="#869195",
        blank=False,
        null=False
    )
    core_sideleft_mask_text = ColorField(
        verbose_name=_("Core Sideleft Mask Text Colour"),
        default="#dbe0e2",
        blank=False,
        null=False
    )
    core_sideleft_highlight_bg = ColorField(
        verbose_name=_("Core Sideleft Hightlight Background Colour"),
        default="#edf3f6",
        blank=False,
        null=False
    )
    core_sideleft_highlight_text = ColorField(
        verbose_name=_("Core Sideleft Hightlight Text Colour"),
        default="#435259",
        blank=False,
        null=False
    )
    # =-
    core_siderigh_bg = ColorField(
        verbose_name=_("Core Siderigh Background Colour"),
        default="#dbe0e2",
        blank=False,
        null=False
    )
    core_siderigh_text = ColorField(
        verbose_name=_("Core Siderigh Text Colour"),
        default="#435259",
        blank=False,
        null=False
    )
    # header
    header_title = ColorField(
        verbose_name=_("Title Colour"),
        default="#435259",
        blank=False,
        null=False
    )
    header_subtitle = ColorField(
        verbose_name=_("Subtitle Colour"),
        default="#869195",
        blank=False,
        null=False
    )
    header_separator = ColorField(
        verbose_name=_("Separator Colour"),
        default="#869195",
        blank=False,
        null=False
    )
    # card
    card_bg = ColorField(
        verbose_name=_("Card Background Colour"),
        default="#dbe0e2",
        blank=False,
        null=False
    )
    card_text = ColorField(
        verbose_name=_("Card Text Colour"),
        default="#435259",
        blank=False,
        null=False
    )
    card_subtle = ColorField(
        verbose_name=_("Card Subtle Text Colour"),
        default="#869195",
        blank=False,
        null=False
    )
    card_mask_bg = ColorField(
        verbose_name=_("Card Mask Background Colour"),
        default="#869195",
        blank=False,
        null=False
    )
    card_mask_text = ColorField(
        verbose_name=_("Card Mask Text Colour"),
        default="#dbe0e2",
        blank=False,
        null=False
    )
    card_radius = models.PositiveSmallIntegerField(
        verbose_name=_("Card Radius"),
        default=4,
        blank=False,
        null=False
    )
    # button
    btn_bg = ColorField(
        verbose_name=_("Button Background Colour"),
        default="#dbe0e2",
        blank=False,
        null=False
    )
    btn_text = ColorField(
        verbose_name=_("Button Text Colour"),
        default="#435259",
        blank=False,
        null=False
    )
    btn_primary_bg = ColorField(
        verbose_name=_("Button Primary Background Colour"),
        default="#435259",
        blank=False,
        null=False
    )
    btn_primary_text = ColorField(
        verbose_name=_("Button Primary Text Colour"),
        default="#dbe0e2",
        blank=False,
        null=False
    )
    btn_radius = models.PositiveSmallIntegerField(
        verbose_name=_("Button Radius"),
        default=4,
        blank=False,
        null=False
    )
    # ===---
    created_at = models.DateTimeField(
        verbose_name=_("Created"),
        auto_now_add=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Theme")
        verbose_name_plural = _("Themes")
        ordering = [
            F("game").asc(nulls_last=True),
            "-updated_at"
        ]

    def __str__(self):
        return f"{_("Theme")}"
