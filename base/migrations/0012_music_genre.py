# Generated by Django 4.1.1 on 2022-10-11 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_playlist_thumnail'),
    ]

    operations = [
        migrations.AddField(
            model_name='music',
            name='genre',
            field=models.CharField(default='song', max_length=30),
        ),
    ]