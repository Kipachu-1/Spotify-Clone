# Generated by Django 4.1.1 on 2022-10-11 18:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_music_genre'),
    ]

    operations = [
        migrations.RenameField(
            model_name='music',
            old_name='music_id',
            new_name='uni_id',
        ),
    ]