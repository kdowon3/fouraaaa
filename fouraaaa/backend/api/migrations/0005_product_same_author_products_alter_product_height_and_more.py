# Generated by Django 5.1.6 on 2025-03-04 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_product_image_product_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='same_author_products',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AlterField(
            model_name='product',
            name='height',
            field=models.DecimalField(blank=True, decimal_places=0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='width',
            field=models.DecimalField(blank=True, decimal_places=0, max_digits=10, null=True),
        ),
    ]
