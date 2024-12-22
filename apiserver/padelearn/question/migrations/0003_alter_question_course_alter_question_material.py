# Generated by Django 5.1.1 on 2024-12-18 21:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("course", "0004_course_image"),
        (
            "question",
            "0002_alter_question_options_alter_questionanswer_options_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="question",
            name="course",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="course.course",
            ),
        ),
        migrations.AlterField(
            model_name="question",
            name="material",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="course.material",
            ),
        ),
    ]
