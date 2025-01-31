import ChatRoom from "@/app/components/ChatRoom";

export default async function ChatRoomPage({ params }) {
  const { userId } = params; // Dynamic Route에서 userId 추출

  if (!userId) {
    return <div>Error: Invalid userId</div>; // userId가 없는 경우 에러 처리
  }

  return (
    <div>
      <h1>Chat Room: {userId}</h1>
      <ChatRoom roomId={userId} /> {/* roomId를 userId로 대체 */}
    </div>
  );
}
