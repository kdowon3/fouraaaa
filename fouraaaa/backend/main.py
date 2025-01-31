from fastapi import FastAPI
from chat.routes import router as chat_router
from api.routes import router as api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 라우터 등록
app.include_router(chat_router, prefix="/chat", tags=["chat"])
app.include_router(api_router, prefix="/api", tags=["API"])

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 루트 경로 추가
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI root endpoint!"}

# 사용자 ID 반환 (테스트용)
@app.get("/me")
async def get_user():
    """
    현재 사용자의 ID 반환
    """
    try:
        user_id = "12345"  # 하드코딩된 사용자 ID
        return {"id": user_id}
    except Exception as e:
        return {"message": f"사용자 정보 조회 실패: {str(e)}"}
