import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongooose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connectDB();
  const { userId, password } = await request.json();

  if (!userId || !password) {
    return NextResponse.json({ error: "필수 값 누락" }, { status: 422 });
  }

  const user = await User.findOne({ userId });
  if (!user) {
    return NextResponse.json(
      { error: "존재하지 않는 아이디입니다" },
      { status: 404 }
    );
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return NextResponse.json(
      { error: "비밀번호를 확인해주세요" },
      { status: 401 }
    );
  }

  return NextResponse.json({ data: user.toJSON() });
}
