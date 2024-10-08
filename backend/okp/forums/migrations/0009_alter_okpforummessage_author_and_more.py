# Generated by Django 5.0.7 on 2024-08-09 18:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('okpforums', '0008_okpforumtopic_content'),
        ('okpgames', '0004_okpgamecharacter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='okpforummessage',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='messages', to='okpgames.okpgamecharacter', verbose_name='Author'),
        ),
        migrations.AlterField(
            model_name='okpforumtopic',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='topics', to='okpgames.okpgamecharacter', verbose_name='Author'),
        ),
    ]
