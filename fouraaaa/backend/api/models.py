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
    price = models.DecimalField(max_digits=10, decimal_places=0, null=True)  # 🔥 가격 필드 추가
    created_at = models.DateTimeField(auto_now_add=True)  # 생성 날짜
    description = models.TextField(blank=True, null=True)  # 설명
    image_url = models.URLField(blank=True, null=True)
    width = models.DecimalField(max_digits=10, decimal_places=0, null=True, blank=True)  # 가로 크기
    height = models.DecimalField(max_digits=10, decimal_places=0, null=True, blank=True)  # 세로 크기
    components = models.JSONField(default=list)  # ✅ 🔥 구성품 리스트 추가

    # ✅ 🔥 같은 작가의 다른 상품 정보 (JSON 형태로 저장)
    same_author_products = models.JSONField(default=list, blank=True)

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
    

    def update_same_author_products(self):
        """ ✅ 같은 작가의 다른 상품 목록을 업데이트 (self.save() 호출 제거) """
        related_products = Product.objects.filter(author=self.author).exclude(id=self.id)
        
        self.same_author_products = [
            {"id": p.id, "name": p.name, "image_url": p.image_url, "price": str(p.price)}
            for p in related_products
        ]


def save(self, *args, **kwargs):
    """ ✅ 저장할 때 무한 루프 방지 """
    is_new = self.pk is None  # 처음 생성되는지 확인

    super().save(*args, **kwargs)  # ✅ DB 저장 먼저 수행

    if not is_new:  
        self.update_same_author_products()  # ✅ 기존 상품 수정 시에만 실행
        super().save(update_fields=["same_author_products"])  # JSON 필드만 업데이트


    def __str__(self):
        return f"{self.name} - {self.author} ({self.category}/{self.material}) - {self.price}원"
