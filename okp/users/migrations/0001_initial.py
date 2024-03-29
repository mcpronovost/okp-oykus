# Generated by Django 4.2.6 on 2023-10-29 16:51

import autoslug.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='okpUserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, verbose_name='Name')),
                ('slug', autoslug.fields.AutoSlugField(blank=True, editable=True, null=True, populate_from='name', unique=True, verbose_name='Slug')),
                ('lang', models.CharField(choices=[('fr', 'French'), ('en', 'English')], default='fr', max_length=6, verbose_name='Language')),
                ('timezone', models.CharField(choices=[('America/Toronto', 'America/Toronto'), ('Europe/Paris', 'Europe/Paris')], default='America/Toronto', max_length=32, verbose_name='Timezone')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Profile',
                'verbose_name_plural': 'Profile',
            },
        ),
    ]
