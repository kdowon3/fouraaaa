from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny
from .models import Product
from .serializers import ProductSerializer
from django.utils.timezone import now
from datetime import timedelta

class ProductViewSet(ReadOnlyModelViewSet):  # ✅ ReadOnlyModelViewSet 사용 (list, retrieve만 가능)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get("category")
        material = self.request.query_params.get("material")
        is_new = self.request.query_params.get("is_new")  # 🔥 신작 필터링 (2일 이내)
        low_stock = self.request.query_params.get("low_stock")  # 🔥 재고 필터링 (10개 이하)

        if category:
            queryset = queryset.filter(category=category)
        if material:
            queryset = queryset.filter(material=material)
        if is_new == "true":  # 🔥 신작 필터 적용
            two_days_ago = now() - timedelta(days=2)
            queryset = queryset.filter(created_at__gte=two_days_ago)
        if low_stock == "true":
            queryset = [p for p in queryset if p.stock <= 10]  # ✅ ORM을 사용할 수 없어 Python 필터링 적용
        return queryset
