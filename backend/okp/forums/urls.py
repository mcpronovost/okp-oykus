from django.urls import path

from okp.forums.views.index import (
    okpForumIndex
)

from okp.forums.views.category import (
    okpForumCategoryView
)

app_name = "okp.forums"

urlpatterns = [
    path("<slug:slug>/index/", okpForumIndex.as_view()),
    path("<slug:slug>/categories/<int:pk>-<slug:category_slug>/", okpForumCategoryView.as_view()),
]
