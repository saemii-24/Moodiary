import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongooose";
import PostModel from "@/models/Post";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
  await connectDB();

  const { userId, date, feeling, title, content } = await request.json();

  if (!userId || !date || !feeling || !title || !content) {
    return NextResponse.json({ error: "필수 값 누락" }, { status: 422 });
  }

  // 유저 확인
  const user = await UserModel.findOne({ userId });
  if (!user) {
    return NextResponse.json(
      { error: "존재하지 않는 사용자입니다" },
      { status: 404 }
    );
  }

  // post 등록
  const newPost = await PostModel.create({
    user: user._id,
    date: new Date(date),
    feeling,
    title,
    content,
  });

  const populated = await newPost.populate("user");

  return NextResponse.json({ data: populated }, { status: 201 });
}
