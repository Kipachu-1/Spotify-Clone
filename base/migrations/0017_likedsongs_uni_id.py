# Generated by Django 4.1.1 on 2022-10-28 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_history'),
    ]

    operations = [
        migrations.AddField(
            model_name='likedsongs',
            name='uni_id',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
