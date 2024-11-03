from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class okpGamesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "okp.games"
    label = "okp_games"
    verbose_name = _("Games")
