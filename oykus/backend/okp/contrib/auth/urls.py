from django.urls import re_path
from django.utils.translation import gettext_lazy as _

from .views import (
    OkpAuthGamesView,
    OkpAuthGamesEditView,
)

games = _("games/")
edit = _("edit/")

urlpatterns = [
    re_path(rf"^{games}$", OkpAuthGamesView.as_view(), name="okp_auth_games"),
    re_path(rf"^{games}(?P<game_id>\d+)/{edit}$", OkpAuthGamesEditView.as_view(), name="okp_auth_games_edit"),
]
