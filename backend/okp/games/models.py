from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class okpGame(models.Model):
    founder = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="founder_games",
        verbose_name=_("Founder"),
        blank=True,
        null=True
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="owner_games",
        verbose_name=_("Owner"),
        blank=False,
        null=True
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        blank=False,
        null=False
    )
    slug = models.SlugField(
        verbose_name=_("Slug"),
        max_length=255,
        blank=False,
        null=False
    )
    is_active = models.BooleanField(
        verbose_name=_("Active"),
        default=False
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created At"),
        auto_now_add=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated At"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Game")
        verbose_name_plural = _("Games")
        ordering = ["name"]

    def __str__(self):
        return f"{self.name}"


class okpGameCharacter(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="characters",
        verbose_name=_("User"),
        blank=False,
        null=False
    )
    game = models.ForeignKey(
        okpGame,
        on_delete=models.SET_NULL,
        related_name="characters",
        verbose_name=_("Game"),
        blank=True,
        null=True
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        blank=False,
        null=False
    )
    avatar = models.ImageField(
        verbose_name=_("Avatar"),
        upload_to="characters/avatars/",
        blank=True,
        null=True
    )
    is_active = models.BooleanField(
        verbose_name=_("Active"),
        default=True
    )
    is_valid = models.BooleanField(
        verbose_name=_("Valid"),
        default=False
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created At"),
        auto_now_add=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated At"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Character")
        verbose_name_plural = _("Characters")

    def __str__(self):
        return f"{self.name}"
