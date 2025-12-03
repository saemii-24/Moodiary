import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongooose";
import PostModel from "@/models/Post";
import UserModel from "@/models/User";
export async function POST(request: NextRequest) {
  await connectDB();

  const body = await request.json();
  const { userId, dateKey, feeling, title, content } = body;

  if (!userId || !dateKey || !feeling || !title || !content) {
    return NextResponse.json({ error: "필수 값 누락" }, { status: 422 });
  }

  const user = await UserModel.findOne({ userId });
  if (!user) {
    return NextResponse.json(
      { error: "존재하지 않는 사용자입니다" },
      { status: 404 }
    );
  }

  if (!/^\d{8}$/.test(String(dateKey))) {
    return NextResponse.json({ error: "잘못된 dateKey 형식" }, { status: 422 });
  }

  const keyNum = Number(dateKey);
  // dateKey only storage; no Date construction needed
  const newPost = await PostModel.create({
    user: user._id,
    dateKey: keyNum,
    feeling,
    title,
    content,
  });

  const populated = await newPost.populate("user");
  return NextResponse.json({ data: populated }, { status: 201 });
}

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const dateKey = searchParams.get("dateKey");

  if (!userId || !dateKey) {
    return NextResponse.json({ error: "필수 값 누락" }, { status: 422 });
  }

  if (!/^\d{8}$/.test(dateKey)) {
    return NextResponse.json({ error: "잘못된 dateKey 형식" }, { status: 422 });
  }

  const user = await UserModel.findOne({ userId });
  if (!user) {
    return NextResponse.json(
      { error: "존재하지 않는 사용자입니다" },
      { status: 404 }
    );
  }

  const post = await PostModel.findOne({
    user: user._id,
    dateKey: Number(dateKey),
  }).populate("user");

  if (!post) {
    return NextResponse.json(
      { error: "해당 날짜의 기록이 없습니다" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: post }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const postId = searchParams.get("postId");

  // 필수 값 체크
  if (!userId || !postId) {
    return NextResponse.json({ error: "필수 값 누락" }, { status: 422 });
  }

  // 사용자 존재 여부 확인
  const user = await UserModel.findOne({ userId });
  if (!user) {
    return NextResponse.json(
      { error: "존재하지 않는 사용자입니다" },
      { status: 404 }
    );
  }

  // 게시글 존재 여부 확인
  const post = await PostModel.findById(postId);
  if (!post) {
    return NextResponse.json(
      { error: "존재하지 않는 게시글입니다" },
      { status: 404 }
    );
  }

  // 권한 확인
  if (post.user.toString() !== user._id.toString()) {
    return NextResponse.json(
      { error: "게시글 삭제 권한이 없습니다" },
      { status: 403 }
    );
  }

  await PostModel.findByIdAndDelete(postId);

  return NextResponse.json(
    { message: "게시글이 정상적으로 삭제되었습니다", postId },
    { status: 200 }
  );
}
