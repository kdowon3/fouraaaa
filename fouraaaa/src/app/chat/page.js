"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatRoomsPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:8000/rooms");
        if (res.ok) {
          const data = await res.json();
          setRooms(data.rooms);
        } else {
          console.error("Failed to fetch rooms:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <Link href={`/chat/${room.id}`}>Chat Room {room.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
