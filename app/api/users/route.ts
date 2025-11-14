import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongooose";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  await connectDB();
  const { userId, nickname, password } = await request.json();
  if (!userId || !nickname || !password)
    return NextResponse.json({ error: "필수 누락" }, { status: 422 });

  const exists = await User.findOne({ userId }).lean();
  if (exists)
    return NextResponse.json({ error: "중복 userId" }, { status: 409 });

  const created = await User.create({ userId, nickname, password });
  const { password: _p, ...safe } = created.toJSON();
  return NextResponse.json({ data: safe }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const list = await User.find({}, { password: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({ data: list });
}
