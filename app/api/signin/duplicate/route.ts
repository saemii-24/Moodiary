import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongooose";
import User from "@/models/User";

/**
 * 중복 체크 결과 형식:
 * { exists: boolean }  // true면 이미 사용 중인 아이디
 * { exists: false }    // 사용 가능한 아이디
 */

function missing(resMsg = "userId required") {
  return NextResponse.json({ error: resMsg }, { status: 422 });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return missing();
  // userId가 변수 userId값과 같은 문서 1개를 찾는다.
  const found = await User.findOne({ userId }).lean();
  return NextResponse.json({ exists: !!found });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { userId } = await req.json();
  if (!userId || typeof userId !== "string") return missing();
  const found = await User.findOne({ userId }).lean();
  return NextResponse.json({ exists: !!found });
}
