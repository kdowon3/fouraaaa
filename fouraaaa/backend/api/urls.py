from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet  # ✅ ViewSet 임포트 확인

# ✅ DefaultRouter 사용하여 자동 라우팅
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),  # ✅ API 경로 등록
]
