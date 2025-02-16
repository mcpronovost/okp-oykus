from django.urls import include, path

urlpatterns = [
    path("auth/", include("okp.contrib.auth.urls")),
]
