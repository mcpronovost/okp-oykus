# Generated by Django 5.1.2 on 2024-10-20 13:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forums', '0001_initial'),
        ('games', '0005_remove_okpforumtopic_category_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='okpforummessage',
            name='topic',
        ),
        migrations.AlterModelOptions(
            name='okpforumcategory',
            options={'ordering': [models.OrderBy(models.F('sortby'), nulls_last=True), 'created_at'], 'verbose_name': 'Category', 'verbose_name_plural': 'Categories'},
        ),
        migrations.AlterModelOptions(
            name='okpforummessage',
            options={'ordering': ['created_at'], 'verbose_name': 'Message', 'verbose_name_plural': 'Messages'},
        ),
        migrations.AlterModelOptions(
            name='okpforumsection',
            options={'ordering': [models.OrderBy(models.F('sortby'), nulls_last=True), 'created_at'], 'verbose_name': 'Section', 'verbose_name_plural': 'Sections'},
        ),
        migrations.CreateModel(
            name='okpForumChapter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, verbose_name='Name')),
                ('slug', models.SlugField(blank=True, max_length=120, null=True, verbose_name='Slug')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='chapters', to='forums.okpforumcategory', verbose_name='Category')),
                ('game', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='chapters', to='games.okpgame', verbose_name='Game')),
                ('section', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='chapters', to='forums.okpforumsection', verbose_name='Section')),
            ],
            options={
                'verbose_name': 'Chapter',
                'verbose_name_plural': 'Chapters',
                'ordering': ['-updated_at', '-created_at'],
            },
        ),
        migrations.AddField(
            model_name='okpforummessage',
            name='chapter',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='messages', to='forums.okpforumchapter', verbose_name='chapter'),
        ),
        migrations.DeleteModel(
            name='okpForumTopic',
        ),
    ]
