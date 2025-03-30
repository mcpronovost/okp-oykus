from django.urls import path, re_path
from django.utils.translation import gettext_lazy as _

from okp.contrib.game.views import (
    OkpGameCommunityCharacterProfileView,
    OkpGameView,
    OkpGameForumCategoryView,
    OkpGameForumSectionView,
    OkpGameForumTopicView,
)

community_base = _("community/")
character_pattern = r"c(?P<character_id>[\d]+)-(?P<character_slug>[\w-]+)/"
category_pattern = r"c(?P<category_id>[\d]+)-(?P<category_slug>[\w-]+)/"
section_pattern = r"s(?P<section_id>[\d]+)-(?P<section_slug>[\w-]+)/"
topic_pattern = r"t(?P<topic_id>[\d]+)-(?P<topic_slug>[\w-]+)/"

urlpatterns = [
    # Community
    re_path(
        rf"^{community_base}{character_pattern}",
        OkpGameCommunityCharacterProfileView.as_view(),
        name="game-community-character-profile",
    ),
    # Forum
    re_path(
        rf"^{category_pattern}{section_pattern}{topic_pattern}",
        OkpGameForumTopicView.as_view(),
        name="game-forum-topic",
    ),
    re_path(
        rf"^{category_pattern}{section_pattern}",
        OkpGameForumSectionView.as_view(),
        name="game-forum-section",
    ),
    re_path(
        rf"^{category_pattern}",
        OkpGameForumCategoryView.as_view(),
        name="game-forum-category",
    ),
    # Root
    path("", OkpGameView.as_view(), name="game"),
]
