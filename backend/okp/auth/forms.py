from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField, UsernameField
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from okp.auth.models import (
    okpUser
)


class okpUserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(
        label=_("Password"),
        help_text=_(
            "Raw passwords are not stored, so there is no way to see "
            "the user’s password."
        ),
    )

    class Meta:
        model = okpUser
        fields = "__all__"
        field_classes = {"username": UsernameField}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        password = self.fields.get("password")
        if password:
            if self.instance and not self.instance.has_usable_password():
                password.help_text = _(
                    "Enable password-based authentication for this user by setting a "
                    "password."
                )
        user_permissions = self.fields.get("user_permissions")
        if user_permissions:
            user_permissions.queryset = user_permissions.queryset.select_related(
                "content_type"
            )
