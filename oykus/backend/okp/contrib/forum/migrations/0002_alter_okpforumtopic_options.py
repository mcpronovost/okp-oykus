# Generated by Django 5.1.6 on 2025-03-17 21:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('okp_forum', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='okpforumtopic',
            options={'ordering': ['-last_post__updated_at', '-last_post__created_at', '-created_at'], 'verbose_name': 'Topic', 'verbose_name_plural': 'Topics'},
        ),
    ]
