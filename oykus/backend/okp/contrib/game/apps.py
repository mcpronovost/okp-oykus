from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class OkpGameConfig(AppConfig):
    name = "okp.contrib.game"
    label = "okp_game"
    verbose_name = _("Game")
