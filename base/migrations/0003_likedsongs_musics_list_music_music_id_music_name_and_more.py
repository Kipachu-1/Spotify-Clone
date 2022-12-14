# Generated by Django 4.1.1 on 2022-09-27 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_music'),
    ]

    operations = [
        migrations.AddField(
            model_name='likedsongs',
            name='musics_list',
            field=models.ManyToManyField(to='base.music'),
        ),
        migrations.AddField(
            model_name='music',
            name='music_id',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='music',
            name='name',
            field=models.CharField(default=22, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user_playlists',
            name='playlists',
            field=models.TextField(),
        ),
    ]
