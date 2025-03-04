# Generated by Django 5.1.6 on 2025-02-13 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("author", models.CharField(max_length=255)),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("식기", "식기"),
                            ("오브제", "오브제"),
                            ("아트퍼니처", "아트퍼니처"),
                        ],
                        max_length=20,
                    ),
                ),
                (
                    "material",
                    models.CharField(
                        choices=[("도자", "도자"), ("유리", "유리"), ("금속", "금속")],
                        max_length=20,
                    ),
                ),
                ("total_production", models.IntegerField(default=0)),
                ("order_quantity", models.IntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "image",
                    models.ImageField(
                        blank=True, null=True, upload_to="product_images/"
                    ),
                ),
                ("components", models.JSONField(default=list)),
            ],
        ),
    ]
