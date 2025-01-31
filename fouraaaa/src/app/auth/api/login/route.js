import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "아이디와 비밀번호를 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    const usersRef = collection(db, "users");

    // 사용자 검색
    const userQuery = query(usersRef, where("username", "==", username));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return NextResponse.json(
        { message: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const userData = userSnapshot.docs[0].data();

    // 비밀번호 검증
    const isPasswordValid = bcrypt.compareSync(password, userData.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // 로그인 성공: 사용자 데이터 반환
    return NextResponse.json(
      {
        message: "로그인 성공!",
        username: userData.username,
        role: userData.role, // "user" 또는 "admin"
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `서버 오류: ${error.message}` },
      { status: 500 }
    );
  }
}
