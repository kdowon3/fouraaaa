import { NextResponse } from "next/server";
import { collection, doc, getDocs, runTransaction, addDoc, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { username, password, role } = await req.json();

  // 입력값 검증
  if (!username || !password || !role) {
    return NextResponse.json(
      { message: "아이디, 비밀번호, 역할을 입력해주세요." },
      { status: 400 }
    );
  }

  if (!["user", "admin"].includes(role)) {
    return NextResponse.json(
      { message: "유효하지 않은 역할입니다. 'user' 또는 'admin'만 가능합니다." },
      { status: 400 }
    );
  }

  try {
    const usersRef = collection(db, "users");

    // 사용자 중복 확인
    const userQuery = query(usersRef, where("username", "==", username));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      return NextResponse.json(
        { message: "이미 존재하는 사용자입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 트랜잭션을 사용하여 고유 ID 생성
    const counterRef = doc(db, "counters", "users");
    const newId = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef);

      if (!counterDoc.exists()) {
        throw new Error("ID 카운터가 초기화되지 않았습니다.");
      }

      const currentId = counterDoc.data().currentId || 0;
      const updatedId = currentId + 1;

      transaction.update(counterRef, { currentId: updatedId });
      return updatedId;
    });

    // Firestore에 사용자 추가
    await addDoc(usersRef, {
      id: newId,
      username,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: `${role === "admin" ? "운영자" : "사용자"} 계정 생성 성공!`, id: newId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `서버 오류: ${error.message}` },
      { status: 500 }
    );
  }
}
