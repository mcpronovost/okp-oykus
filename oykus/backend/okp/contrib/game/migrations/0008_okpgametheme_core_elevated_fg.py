# Generated by Django 5.1.6 on 2025-03-26 15:12

import colorfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('okp_game', '0007_okpgametheme_card_placeholder_fg'),
    ]

    operations = [
        migrations.AddField(
            model_name='okpgametheme',
            name='core_elevated_fg',
            field=colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None, verbose_name='Core Elevated Text Colour'),
        ),
    ]
