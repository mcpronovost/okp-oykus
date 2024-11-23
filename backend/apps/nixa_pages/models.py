from django.db import models

from wagtail.admin.panels import FieldPanel
from wagtail.fields import StreamField
from wagtail.models import Page


LIST_PLUGINBLOCKS = []


class HomePage(Page):
    content = StreamField(
        LIST_PLUGINBLOCKS,
        use_json_field=True,
        blank=True
    )

    content_panels = [
        FieldPanel("title_fr"),
        FieldPanel("title_en"),
        FieldPanel("content"),
    ]

    promote_panels = [
        FieldPanel("slug_fr"),
        FieldPanel("slug_en"),
        FieldPanel("seo_title_fr"),
        FieldPanel("seo_title_en"),
        FieldPanel("search_description_fr"),
        FieldPanel("search_description_en"),
    ]
