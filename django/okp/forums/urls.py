from django.urls import path
from django.utils.translation import gettext_lazy as _

from okp.forums.views import (
    okpForumCategoriesView,
    okpForumCategoryView,
    okpForumSectionView,
    okpForumTopicView
)

urlpatterns = [
    path("<slug:slug>/categories/", okpForumCategoriesView.as_view()),
    path("<slug:slug>/categories/<int:pk>/", okpForumCategoryView.as_view()),
    path("<slug:slug>/sections/<int:pk>/", okpForumSectionView.as_view()),
    path("<slug:slug>/topics/<int:pk>/", okpForumTopicView.as_view()),
]
