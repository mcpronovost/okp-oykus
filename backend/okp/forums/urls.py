from django.urls import path

from okp.forums.views.index import okpForumIndex

app_name = "okp.forums"

urlpatterns = [
    path("<slug:slug>/index/", okpForumIndex.as_view()),
]
