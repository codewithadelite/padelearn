# Generated by Django 5.1.1 on 2024-09-20 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("question", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="question",
            options={"verbose_name": "Question", "verbose_name_plural": "Questions"},
        ),
        migrations.AlterModelOptions(
            name="questionanswer",
            options={
                "verbose_name": "Question Answer",
                "verbose_name_plural": "Question Answers",
            },
        ),
        migrations.AlterModelTable(
            name="question",
            table="questions",
        ),
        migrations.AlterModelTable(
            name="questionanswer",
            table="questions_answers",
        ),
    ]
