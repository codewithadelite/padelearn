# Generated by Django 5.1.1 on 2024-09-20 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="user",
            options={"verbose_name": "User", "verbose_name_plural": "Users"},
        ),
        migrations.AlterModelTable(
            name="user",
            table="users",
        ),
    ]