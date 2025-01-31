# backend/chat/models.py
from pydantic import BaseModel

class Message(BaseModel):
    room_id: str
    content: str
    timestamp: str
