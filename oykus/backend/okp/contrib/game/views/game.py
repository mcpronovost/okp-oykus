from okp.core.views import OkpPageView
from okp.contrib.game.models import OkpGame
from okp.contrib.game.serializers import (
    OkpGameForumIndexSerializer,
    OkpGameForumCategorySerializer,
    OkpGameForumSectionSerializer,
    OkpGameForumTopicSerializer,
)


class OkpGameView(OkpPageView):
    model = OkpGame
    serializer_class = OkpGameForumIndexSerializer
    key = "slug"
    page_title_field = "title"
    page_favicon_field = "favicon"


class OkpGameForumCategoryView(OkpPageView):
    model = OkpGame
    serializer_class = OkpGameForumCategorySerializer
    key = "slug"
    page_title_field = "category.title"
    page_favicon_field = "favicon"


class OkpGameForumSectionView(OkpPageView):
    model = OkpGame
    serializer_class = OkpGameForumSectionSerializer
    key = "slug"
    page_title_field = "section.title"
    page_favicon_field = "favicon"


class OkpGameForumTopicView(OkpPageView):
    model = OkpGame
    serializer_class = OkpGameForumTopicSerializer
    key = "slug"
    page_title_field = "topic.title"
    page_favicon_field = "favicon"
