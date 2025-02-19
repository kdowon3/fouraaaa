from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ("식기", "식기"),
        ("오브제", "오브제"),
        ("아트퍼니처", "아트퍼니처"),
    ]

    MATERIAL_CHOICES = [
        ("도자", "도자"),
        ("유리", "유리"),
        ("금속", "금속"),
    ]

    name = models.CharField(max_length=255)  # 상품명
    author = models.CharField(max_length=255)  # 작가
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)  # 종류
    material = models.CharField(max_length=20, choices=MATERIAL_CHOICES)  # 재료
    total_production = models.IntegerField(default=0)  # 총 생산량
    order_quantity = models.IntegerField(default=0, editable=False)  # 주문량 (자동 증가)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)  # 🔥 가격 필드 추가
    created_at = models.DateTimeField(auto_now_add=True)  # 생성 날짜
    description = models.TextField(blank=True, null=True)  # 설명
    image = models.ImageField(upload_to="product_images/", blank=True, null=True)  # 이미지 업로드
    components = models.JSONField(default=list)  # 구성품 리스트

    @property
    def stock(self):
        """ 🔥 남은 재고량 = 총생산량 - 주문량 """
        return self.total_production - self.order_quantity

    def add_order(self, quantity):
        """ 🔥 주문량을 증가시키는 메서드 """
        if self.stock >= quantity:
            self.order_quantity += quantity
            self.save()
        else:
            raise ValueError("재고가 부족합니다.")

    def __str__(self):
        return f"{self.name} - {self.author} ({self.category}/{self.material}) - {self.price}원"
