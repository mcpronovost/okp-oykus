from django.urls import re_path
from django.utils.translation import gettext_lazy as _

from .views import (
    OkpAuthGamesView,
    OkpAuthGamesEditView,
)

games = _("games/")
edit = _("edit/")
deletion = _("deletion/")
forum = _("forum/")
forum_structure = _("structure/")
style = _("style/")
style_stylesheet = _("stylesheet/")

urlpatterns = [
    re_path(rf"^{games}$", OkpAuthGamesView.as_view(), name="okp_auth_games"),
    re_path(
        rf"^{games}(?P<game_id>\d+)/{edit}$",
        OkpAuthGamesEditView.as_view(),
        name="okp_auth_games_edit",
    ),
    re_path(
        rf"^{games}(?P<game_id>\d+)/{deletion}$",
        OkpAuthGamesEditView.as_view(),
        name="okp_auth_games_deletion",
    ),
    re_path(
        rf"^{games}(?P<game_id>\d+)/{forum}$",
        OkpAuthGamesEditView.as_view(),
        name="okp_auth_games_forum",
    ),
    re_path(
        rf"^{games}(?P<game_id>\d+)/{forum}{forum_structure}$",
        OkpAuthGamesEditView.as_view(),
        name="okp_auth_games_forum_structure",
    ),
    re_path(
        rf"^{games}(?P<game_id>\d+)/{style}$",
        OkpAuthGamesEditView.as_view(),
        name="okp_auth_games_style",
    ),
    re_path(
        rf"^{games}(?P<game_id>\d+)/{style}{style_stylesheet}$",
        OkpAuthGamesEditView.as_view(),
        name="okp_auth_games_stylesheet",
    ),
]
