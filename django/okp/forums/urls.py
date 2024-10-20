from django.urls import path
from django.utils.translation import gettext_lazy as _

from okp.forums.views import (
    okpForumCategoriesView
)

urlpatterns = [
    path("<slug:slug>/categories/", okpForumCategoriesView.as_view())
]