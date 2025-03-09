from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, add_banner, get_banners  # ✅ ViewSet 임포트 확인

# ✅ DefaultRouter 사용하여 자동 라우팅
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),  # ✅ API 경로 등록
    path("banner/add/", add_banner, name="add_banner"),
    path("banners/", get_banners, name="get_banners"),
]
