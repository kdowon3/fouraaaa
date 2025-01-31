# backend/chat/connection_manager.py
from typing import List, Dict
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        # 채팅방 ID별 WebSocket 연결 저장
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        """새로운 WebSocket 연결 추가"""
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        self.active_connections[room_id].append(websocket)

    def disconnect(self, websocket: WebSocket, room_id: str):
        """WebSocket 연결 제거"""
        if room_id in self.active_connections:
            self.active_connections[room_id].remove(websocket)
            if not self.active_connections[room_id]:
                del self.active_connections[room_id]

    async def broadcast(self, message: str, room_id: str):
        """특정 채팅방의 모든 사용자에게 메시지 전송"""
        if room_id in self.active_connections:
            for connection in self.active_connections[room_id]:
                await connection.send_text(message)
