# Generated by Django 5.0.7 on 2024-07-12 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('okpforums', '0002_alter_okpforumsection_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='okpforummessage',
            options={'verbose_name': 'Message', 'verbose_name_plural': 'Messages'},
        ),
        migrations.AlterField(
            model_name='okpforumcategory',
            name='description',
            field=models.CharField(max_length=255, verbose_name='Description'),
        ),
        migrations.AlterField(
            model_name='okpforumsection',
            name='description',
            field=models.CharField(max_length=255, verbose_name='Description'),
        ),
    ]
