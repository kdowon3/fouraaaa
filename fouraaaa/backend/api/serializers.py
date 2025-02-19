from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField()  # ✅ stock 필드 추가

    def get_stock(self, obj):
        return obj.stock  # ✅ 자동 계산된 재고 반환

    class Meta:
        model = Product
        fields = ["id", "name", "author", "category", "material", "price", "image", "stock", "created_at"]
