# Generated by Django 4.1.4 on 2022-12-07 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_remove_recipe_method_remove_recipe_other_ingredients_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='steps',
            field=models.TextField(max_length=10000),
        ),
    ]