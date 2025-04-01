from django.core.validators import FileExtensionValidator
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _

from okp.core.fields import OkpImageField
from okp.core.utils import get_abbr, get_slug
from okp.core.validators import okp_image_size_validator

User = get_user_model()


class OkpGame(models.Model):
    title = models.CharField(
        verbose_name=_("Title"),
        max_length=255,
        blank=False,
        null=False,
    )
    slug = models.SlugField(
        verbose_name=_("Slug"),
        max_length=255,
        unique=True,
        blank=True,
        null=False,
    )
    is_slug_auto = models.BooleanField(
        verbose_name=_("Auto-Generate Slug"),
        default=True,
    )
    abbr = models.CharField(
        verbose_name=_("Abbreviation"),
        max_length=3,
        blank=True,
        null=False,
    )
    is_abbr_auto = models.BooleanField(
        verbose_name=_("Auto-Generate Abbreviation"),
        default=True,
    )
    subtitle = models.CharField(
        verbose_name=_("Subtitle"),
        max_length=255,
        blank=True,
        null=True,
    )
    logo = OkpImageField(
        verbose_name=_("Logo"),
        upload_to="games/logos",
        max_width=200,
        max_height=200,
        blank=True,
        null=True,
        validators=[
            okp_image_size_validator,
            FileExtensionValidator(
                allowed_extensions=["jpg", "jpeg", "png", "webp"]
            ),
        ],
    )
    favicon = OkpImageField(
        verbose_name=_("Favicon"),
        upload_to="games/favicons",
        max_width=32,
        max_height=32,
        format="ICO",
        shape="circle",
        blank=True,
        null=True,
    )
    cover = OkpImageField(
        verbose_name=_("Cover"),
        upload_to="games/covers",
        max_width=1200,
        max_height=256,
        blank=True,
        null=True,
        validators=[
            okp_image_size_validator,
            FileExtensionValidator(
                allowed_extensions=["jpg", "jpeg", "png", "webp"]
            ),
        ],
    )
    # Ownership
    founder = models.CharField(
        verbose_name=_("Founder"),
        max_length=255,
        blank=True,
        null=True,
    )
    founder_link = models.URLField(
        verbose_name=_("Founder Link"),
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(
        User,
        verbose_name=_("Owner"),
        on_delete=models.SET_NULL,
        related_name="games",
        blank=True,
        null=True,
    )
    # Status
    is_active = models.BooleanField(
        verbose_name=_("Is Active"),
        default=True,
        help_text=_("Whether the game is active and can be used."),
    )
    is_public = models.BooleanField(
        verbose_name=_("Is Public"),
        default=False,
        help_text=_("Whether the game is public and can be viewed by everyone."),
    )
    # Important Dates
    founded_at = models.DateField(
        verbose_name=_("Founded At"),
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created At"),
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated At"),
        auto_now=True,
    )

    class Meta:
        verbose_name = _("Game")
        verbose_name_plural = _("Games")
        ordering = ["title", "-updated_at", "-created_at"]

    def __str__(self):
        return self.title

    @cached_property
    def url(self):
        g = f"g/{self.slug}"
        return f"{g}"

    @property
    def primary(self):
        theme = self.theme.filter(is_active=True).first()
        if theme:
            return theme.primary
        return None

    def save(self, *args, **kwargs):
        if self.is_slug_auto:
            self.slug = get_slug(self.title, self, OkpGame)
        if self.is_abbr_auto:
            self.abbr = get_abbr(self.title, 3)

        # Handle favicon based on logo state
        if not self.logo and self.favicon:
            # Delete favicon if logo is removed
            self.favicon = None
        elif self.logo and not self.logo._committed:  # pylint: disable=protected-access
            # Create/update favicon when logo is added/changed
            self.favicon = self.logo

        super().save(*args, **kwargs)
