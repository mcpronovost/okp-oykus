from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import F
from django.utils.translation import gettext_lazy as _

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
