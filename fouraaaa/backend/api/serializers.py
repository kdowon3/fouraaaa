from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField()  # ✅ stock 추가
    

    class Meta:
        model = Product
        fields = "__all__"

    def get_stock(self, obj):
        return obj.stock  # ✅ stock 값 반환
