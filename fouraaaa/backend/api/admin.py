from django.contrib import admin
from .models import Product
from .models import Banner
from django.utils.html import format_html

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "author", "category", "stock", "price", "created_at")
    search_fields = ("name", "author")
    list_filter = ("category", "material", "created_at")
    ordering = ("-created_at",)
    
    
@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ("title", "image_preview", "order", "created_at")  # ✅ 리스트에서 표시할 필드
    ordering = ("order",)  # ✅ 기본 정렬 순서
    search_fields = ("title",)  # ✅ 제목 검색 가능
    list_editable = ("order",)  # ✅ 목록에서 순서(order) 직접 수정 가능
    actions = ["delete_selected"]  # ✅ 다중 삭제 기능 추가

    def image_preview(self, obj):
        """ ✅ Firebase Storage에 업로드된 이미지 미리보기 """
        if obj.image_url:
            return format_html('<img src="{}" width="80px" style="border-radius:5px;" />', obj.image_url)
        return "이미지 없음"
    
    image_preview.short_description = "미리보기"  # ✅ 컬럼명 변경

    def delete_selected(self, request, queryset):
        """ ✅ 여러 개 배너 선택 후 삭제 """
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f"{count}개의 배너가 삭제되었습니다.")

    delete_selected.short_description = "선택한 배너 삭제"

    def get_form(self, request, obj=None, **kwargs):
        """ ✅ 배너 수정 페이지에서 이미지 미리보기 제공 """
        form = super().get_form(request, obj, **kwargs)
        if obj:
            form.base_fields["image_url"].help_text = format_html(
                '<img src="{}" width="250px" style="margin-top:10px;border-radius:5px;" /><br>이미지 URL을 변경하려면 직접 수정하세요.',
                obj.image_url
            )
        return form