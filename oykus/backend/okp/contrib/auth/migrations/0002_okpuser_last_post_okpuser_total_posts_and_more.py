# Generated by Django 5.1.6 on 2025-03-28 02:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('okp_auth', '0001_initial'),
        ('okp_forum', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='okpuser',
            name='last_post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='last_post_user', to='okp_forum.okpforumpost', verbose_name='Last Post'),
        ),
        migrations.AddField(
            model_name='okpuser',
            name='total_posts',
            field=models.IntegerField(default=0, verbose_name='Total Posts'),
        ),
        migrations.AddField(
            model_name='okpuser',
            name='total_topics',
            field=models.IntegerField(default=0, verbose_name='Total Topics'),
        ),
    ]
