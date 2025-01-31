from fastapi import APIRouter

router = APIRouter()

@router.get("/hello")
async def say_hello():
    """간단한 테스트 API"""
    return {"message": "Hello from FastAPI!"}

@router.get("/info")
async def get_info():
    """기타 정보 반환 API"""
    return {"info": "This is a test endpoint"}
