# Generated by Django 5.1 on 2024-08-16 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0004_alter_url_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='url',
            name='short_url',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
