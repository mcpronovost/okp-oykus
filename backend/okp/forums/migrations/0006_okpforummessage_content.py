# Generated by Django 5.1.2 on 2024-10-23 01:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forums', '0005_remove_okpforummessage_chapter_okpforumtopic_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='okpforummessage',
            name='content',
            field=models.TextField(blank=True, null=True, verbose_name='Content'),
        ),
    ]