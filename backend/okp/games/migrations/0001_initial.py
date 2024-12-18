# Generated by Django 5.1.3 on 2024-11-30 20:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='OkpGame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('abbr', models.CharField(blank=True, max_length=3, verbose_name='Abbreviation')),
                ('slug', models.SlugField(max_length=255, unique=True, verbose_name='Slug')),
                ('is_slug_auto', models.BooleanField(default=True, verbose_name='Auto-Generate Slug')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('is_private', models.BooleanField(default=True, verbose_name='Is Private')),
                ('total_players', models.PositiveIntegerField(default=0, verbose_name='Total Players')),
                ('total_characters', models.PositiveIntegerField(default=0, verbose_name='Total Characters')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('founder', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='games_founded', to=settings.AUTH_USER_MODEL, verbose_name='Founder')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='games_owned', to=settings.AUTH_USER_MODEL, verbose_name='Owner')),
            ],
            options={
                'verbose_name': 'Game',
                'verbose_name_plural': 'Games',
            },
        ),
    ]
