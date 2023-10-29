from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from autoslug import AutoSlugField

CHOIX_LANGS = [
    ("fr", _("French")),
    ("en", _("English"))
]

CHOIX_TIMEZONES = [
    ("America/Toronto", _("America/Toronto")),
    ("Europe/Paris", _("Europe/Paris"))
]


class okpUserProfile(models.Model):
    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="profile",
        verbose_name=_("User"),
        blank=False,
        null=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        blank=False,
        null=False
    )
    slug = AutoSlugField(
        verbose_name=_("Slug"),
        populate_from="name",
        unique=True,
        editable=True,
        blank=True,
        null=True
    )
    lang = models.CharField(
        verbose_name=_("Language"),
        max_length=6,
        choices=CHOIX_LANGS,
        default="fr",
        blank=False,
        null=False
    )
    timezone = models.CharField(
        verbose_name=_("Timezone"),
        max_length=32,
        choices=CHOIX_TIMEZONES,
        default="America/Toronto",
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profile")

    def __str__(self):
        return "%s" % (
            str(_("Profile"))
        )

    @property
    def initial(self):
        return "".join([x[0] for x in self.name.split()[:2]]).upper()
