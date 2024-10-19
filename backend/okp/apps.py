from django.contrib.admin.apps import AdminConfig


class okpAdminConfig(AdminConfig):
    default_site = "okp.admin.okpAdminSite"
