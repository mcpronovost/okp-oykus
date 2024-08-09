from django.urls import path
from okp.forums.views.index import (
    okpForumIndex
)
from okp.forums.views.category import (
    okpForumCategoryView
)
from okp.forums.views.section import (
    okpForumSectionView
)
from okp.forums.views.topic import (
    okpForumTopicView
)

app_name = "okp.forums"

urlpatterns = [
    path("<slug:slug>/index/", okpForumIndex.as_view()),
    path("<slug:slug>/categories/<int:pk>-<slug:category_slug>/", okpForumCategoryView.as_view()),
    path("<slug:slug>/sections/<int:pk>-<slug:section_slug>/", okpForumSectionView.as_view()),
    path("<slug:slug>/topics/<int:pk>-<slug:topic_slug>/", okpForumTopicView.as_view())
]
