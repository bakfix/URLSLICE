# Generated by Django 5.1 on 2024-08-16 08:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0005_alter_url_short_url'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Token',
        ),
    ]
