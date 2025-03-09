from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from django.utils.timezone import now
from datetime import timedelta
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
from rest_framework.pagination import PageNumberPagination
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Banner

class ProductPagination(PageNumberPagination):
    page_size = 8  # ✅ 한 페이지에 8개씩
    page_size_query_param = "page_size"
    max_page_size = 50  # ✅ 최대 50개까지 가능

class ProductViewSet(ModelViewSet):
    """
    🔥 상품 관련 CRUD API (상품 등록, 조회, 수정, 삭제)
    """
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination

    def get_queryset(self):
        """
        ✅ 상품 리스트 조회 (필터링 가능)
        - `category`: 특정 카테고리 필터
        - `material`: 특정 재료 필터
        - `is_new=true`: 최근 2일 이내 생성된 신작만 조회
        - `low_stock=true`: 재고가 10개 이하인 상품만 조회
        """
        queryset = Product.objects.all()
        category = self.request.query_params.get("category")
        material = self.request.query_params.get("material")
        is_new = self.request.query_params.get("is_new")
        low_stock = self.request.query_params.get("low_stock")

        if category:
            queryset = queryset.filter(category=category)
        if material:
            queryset = queryset.filter(material=material)
        if is_new == "true":
            two_days_ago = now() - timedelta(days=2)
            queryset = queryset.filter(created_at__gte=two_days_ago)
        if low_stock == "true":
            queryset = queryset.filter(total_production__lte=10)  # ✅ 10개 이하만 조회

        return queryset

    def create(self, request, *args, **kwargs):
        """
        ✅ 상품 생성 (POST /api/products/)
        - 상품 등록 시 같은 작가의 상품 목록(`same_author_products`)도 자동 업데이트
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()  # 🔥 DB에 저장
            product.update_same_author_products()  # ✅ 같은 작가 상품 목록 업데이트
            product.save(update_fields=["same_author_products"])  # ✅ JSON 필드만 업데이트
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        """
        ✅ 상품 상세 조회 (GET /api/products/{id}/)
        - `same_author_products`가 최신 상태인지 보장
        """
        product = get_object_or_404(Product, pk=kwargs["pk"])

        # 🔥 상품 조회 시 같은 작가의 상품 목록을 동적으로 업데이트
        product.update_same_author_products()
        product.save(update_fields=["same_author_products"])

        serializer = self.get_serializer(product)
        response_data = {
            "product": serializer.data,
            "same_author_products": product.same_author_products,  # ✅ 최신 데이터 반환
        }

        return Response(response_data)


@csrf_exempt
def add_banner(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))  # ✅ 인코딩 문제 방지
            title = data.get("title")
            order = data.get("order", 0)
            image_url = data.get("image_url")  # 🔥 Firebase Storage URL 받기

            if not title or not image_url:
                return JsonResponse({"error": "제목과 이미지 URL을 모두 입력하세요."}, status=400)

            # ✅ 배너 저장
            banner = Banner.objects.create(title=title, order=order, image_url=image_url)

            return JsonResponse({"message": "배너가 등록되었습니다.", "banner_id": banner.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "잘못된 JSON 데이터입니다."}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"서버 오류: {str(e)}"}, status=500)

    return JsonResponse({"error": "POST 요청만 허용됩니다."}, status=405)


def get_banners(request):
    banners = Banner.objects.all().order_by("-id")  # 최신 배너부터 정렬
    banner_list = [{"id": banner.id, "image_url": banner.image_url} for banner in banners]
    return JsonResponse({"banners": banner_list})