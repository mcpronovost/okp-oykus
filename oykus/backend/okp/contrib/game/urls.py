from django.urls import re_path
from okp.contrib.game.views.game import (
    OkpGameView,
    OkpGameForumCategoryView,
    OkpGameForumSectionView,
    OkpGameForumTopicView,
)

category_pattern = r"c(?P<category_id>[\d]+)-(?P<category_slug>[\w-]+)/"
section_pattern = r"s(?P<section_id>[\d]+)-(?P<section_slug>[\w-]+)/"
topic_pattern = r"t(?P<topic_id>[\d]+)-(?P<topic_slug>[\w-]+)/"

urlpatterns = [
    re_path(
        rf"^(?P<slug>[\w-]+)/{category_pattern}{section_pattern}{topic_pattern}",
        OkpGameForumTopicView.as_view(),
        name="game-forum-topic",
    ),
    re_path(
        rf"^(?P<slug>[\w-]+)/{category_pattern}{section_pattern}",
        OkpGameForumSectionView.as_view(),
        name="game-forum-section",
    ),
    re_path(
        rf"^(?P<slug>[\w-]+)/{category_pattern}",
        OkpGameForumCategoryView.as_view(),
        name="game-forum-category",
    ),
    re_path(r"^(?P<slug>[\w-]+)/", OkpGameView.as_view(), name="game"),
]
