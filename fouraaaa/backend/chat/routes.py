from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Request
from fastapi.responses import JSONResponse
from firebase_config import db
from firebase_admin import firestore
from .connection_manager import ConnectionManager
import json

router = APIRouter()
manager = ConnectionManager()

@router.get("/me")
async def get_user():
    """
    현재 사용자의 ID 반환
    """
    try:
        # 사용자 ID를 하드코딩하거나 인증 시스템과 연결
        user_id = "12345"
        return {"id": user_id}
    except Exception as e:
        return JSONResponse({"message": f"사용자 정보 조회 실패: {str(e)}"}, status_code=500)

@router.post("/rooms/me")
async def get_or_create_user_room(request: Request):
    """
    사용자 ID로 방 생성 또는 조회
    """
    try:
        body = await request.json()
        user_id = body.get("id")  # 클라이언트에서 전달된 사용자 ID

        if not user_id:
            return JSONResponse(
                {"message": "사용자 ID가 누락되었습니다."},
                status_code=400
            )

        # Firestore에서 user_id로 방 조회
        room_ref = db.collection("rooms").document(str(user_id))
        room = room_ref.get()

        if room.exists:
            # 방이 이미 존재하면 반환
            room_data = room.to_dict()
            return {
                "id": room.id,
                "name": room_data.get("name", f"Room {user_id}"),
                "createdAt": room_data.get("createdAt"),
            }
        else:
            # 방이 존재하지 않으면 새로 생성
            room_ref.set(
                {"name": f"Room {user_id}", "createdAt": firestore.SERVER_TIMESTAMP}
            )
            return {"id": user_id, "name": f"Room {user_id}", "createdAt": None}
    except Exception as e:
        return JSONResponse({"message": f"방 생성/조회 실패: {str(e)}"}, status_code=500)

@router.websocket("/ws/{userId}")
async def websocket_endpoint(websocket: WebSocket, userId: str):
    """WebSocket 엔드포인트: userId로 사용자와 운영자 연결."""
    await manager.connect(websocket, userId)
    try:
        while True:
            raw_data = await websocket.receive_text()
            try:
                # JSON 데이터를 안전하게 파싱
                message = json.loads(raw_data)
                content = message.get("content", "No content")
                sender = message.get("sender", "Unknown")
                timestamp = message.get("timestamp", firestore.SERVER_TIMESTAMP)
            except Exception as e:
                print(f"Error parsing message: {e}")
                continue

            # Firestore에 메시지 저장
            db.collection("rooms").document(userId).collection("messages").add({
                "content": content,
                "sender": sender,
                "timestamp": timestamp,
            })

            # 모든 클라이언트에 메시지 브로드캐스트
            await manager.broadcast(raw_data, userId)
    except WebSocketDisconnect:
        manager.disconnect(websocket, userId)
        await manager.broadcast(f"User disconnected from room {userId}", userId)


@router.get("/rooms/{userId}/messages")
async def get_messages(userId: str):
    """Firestore에서 특정 userId의 메시지를 가져옵니다."""
    try:
        messages_ref = (
            db.collection("rooms")
            .document(userId)
            .collection("messages")
            .order_by("timestamp")
        )
        messages = [
            {
                "id": doc.id,
                "content": doc.to_dict().get("content", "No content"),
                "sender": doc.to_dict().get("sender", "Unknown"),
                "timestamp": doc.to_dict().get("timestamp", "No timestamp"),
            }
            for doc in messages_ref.stream()
        ]
        return {"messages": messages}
    except Exception as e:
        return {"error": f"Failed to fetch messages: {e}"}, 500


@router.get("/rooms")
async def get_all_rooms():
    """운영자가 Firestore의 모든 채팅방을 조회할 수 있도록 제공합니다."""
    try:
        rooms_ref = db.collection("rooms")
        rooms = [{"id": doc.id} for doc in rooms_ref.stream()]
        return {"rooms": rooms}
    except Exception as e:
        return {"error": f"Failed to fetch rooms: {e}"}, 500
