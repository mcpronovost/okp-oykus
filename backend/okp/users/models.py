from django.apps import apps
from django.contrib import auth
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from okp.fields import okpImageField, okpImageSizeValidator
from okp.utils import get_abbr


class OkpUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError("The given username must be set")
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        GlobalUserModel = apps.get_model(
            self.model._meta.app_label, self.model._meta.object_name
        )
        username = GlobalUserModel.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_staff", False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        return self._create_user(username, email, password, **extra_fields)

    def with_perm(self, perm, is_active=True, include_superusers=True, backend=None, obj=None):
        if backend is None:
            backends = auth._get_backends(return_tuples=True)
            if len(backends) == 1:
                backend, _ = backends[0]
            else:
                raise ValueError(
                    "You have multiple authentication backends configured and "
                    "therefore must provide the `backend` argument."
                )
        elif not isinstance(backend, str):
            raise TypeError(
                "backend must be a dotted import path string (got %r)." % backend
            )
        else:
            backend = auth.load_backend(backend)
        if hasattr(backend, "with_perm"):
            return backend.with_perm(
                perm,
                is_active=is_active,
                include_superusers=include_superusers,
                obj=obj,
            )
        return self.none()


class OkpUser(AbstractBaseUser):
    username = models.CharField(
        verbose_name=_("Username"),
        max_length=150,
        unique=True,
        blank=False,
        null=False,
        validators=[UnicodeUsernameValidator()],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
    )
    email = models.EmailField(
        verbose_name=_("Email"),
        blank=False,
        null=False,
    )
    playername = models.CharField(
        verbose_name=_("Playername"),
        max_length=255,
        blank=True,
        null=False,
    )
    abbr = models.CharField(
        verbose_name=_("Abbreviation"),
        max_length=3,
        blank=True,
        null=False,
    )
    avatar = okpImageField(
        verbose_name=_("Avatar"),
        upload_to="users/avatars",
        max_width=200,
        max_height=200,
        blank=True,
        null=True,
        validators=[okpImageSizeValidator],
    )
    cover = okpImageField(
        verbose_name=_("Cover"),
        upload_to="users/covers",
        max_width=1024,
        max_height=256,
        blank=True,
        null=True,
        validators=[okpImageSizeValidator],
    )
    can_create_game = models.BooleanField(
        verbose_name=_("Can Create Game"),
        default=True,
        help_text=_("Whether the user can create games."),
    )
    can_create_character = models.BooleanField(
        verbose_name=_("Can Create Character"),
        default=True,
        help_text=_("Whether the user can create characters."),
    )
    max_games = models.PositiveSmallIntegerField(
        verbose_name=_("Max Games"),
        default=2,
        help_text=_("Maximum number of games a user can create."),
    )
    max_characters = models.PositiveSmallIntegerField(
        verbose_name=_("Max Characters"),
        default=10,
        help_text=_("Maximum number of characters a user can create."),
    )
    is_staff = models.BooleanField(
        verbose_name=_("Staff"),
        default=False,
    )
    is_superuser = models.BooleanField(
        verbose_name=_("Superuser"),
        default=False,
    )
    is_active = models.BooleanField(
        verbose_name=_("Active"),
        default=True
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created"),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated"),
        auto_now=True
    )

    objects = OkpUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def save(self, *args, **kwargs):
        self.abbr = get_abbr(self.playername or self.username)
        super().save(*args, **kwargs)

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def has_perm(self, perm, obj=None):
        # Active superusers have all permissions.
        if self.is_active and self.is_superuser:
            return True
        return False

    def has_perms(self, perm_list, obj=None):
        # Active superusers have all permissions.
        if self.is_active and self.is_superuser:
            return True
        return False

    def has_module_perms(self, app_label):
        # Active superusers have all permissions.
        if self.is_active and self.is_superuser:
            return True
        return False
