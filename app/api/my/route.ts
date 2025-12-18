import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongooose";
import UserModel from "@/models/User";

export async function PATCH(request: NextRequest) {
  await connectDB();
  const { userId, nickname } = await request.json();

  if (!userId || typeof userId !== "string") {
    return NextResponse.json({ error: "userId 누락" }, { status: 422 });
  }
  if (!nickname || typeof nickname !== "string") {
    return NextResponse.json({ error: "nickname 누락" }, { status: 422 });
  }

  const nextNickname = nickname.trim();
  if (nextNickname.length < 1) {
    return NextResponse.json(
      { error: "nickname이 비어있습니다" },
      { status: 422 }
    );
  }

  const user = await UserModel.findOne({ userId });
  if (!user) {
    return NextResponse.json(
      { error: "존재하지 않는 사용자입니다" },
      { status: 404 }
    );
  }

  user.nickname = nextNickname;
  await user.save();

  const payload = user.toJSON();
  return NextResponse.json({ data: payload }, { status: 200 });
}
