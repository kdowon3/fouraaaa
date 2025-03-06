from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "author", "category", "stock", "price", "created_at")
    search_fields = ("name", "author")
    list_filter = ("category", "material", "created_at")
    ordering = ("-created_at",)

