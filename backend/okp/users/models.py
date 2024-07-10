from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class okpUserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
        verbose_name=_("Profile"),
        blank=False,
        null=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    def __str__(self):
        return f"{_('Profile')}"
