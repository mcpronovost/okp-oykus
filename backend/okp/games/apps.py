from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class okpGamesConfig(AppConfig):
    name = "okp.games"
    label = "okpgames"
    verbose_name = _("Games")
