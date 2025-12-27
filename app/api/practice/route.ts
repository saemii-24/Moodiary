// import { NextResponse } from "next/server";
// import User from "@/models/User";
// import { connectDB } from "@/lib/mongooose";

// //id로 찾기
// //id가 아닐 경우는 아래 findOne 사용함
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   await connectDB();
//   const user = await User.findById(params.id);
//   return NextResponse.json(user);
// }

// //email로 찾기
// export async function GET(req: Request) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const email = searchParams.get("email");

//   const user = await User.findOne({ email });
//   return NextResponse.json(user);
// }

// // //email 중복 체크
// // export async function GET(req: Request) {
// //   await connectDB();
// //   const { searchParams } = new URL(req.url);
// //   const email = searchParams.get("email");

// //   const exists = await User.exists({ email });
// //   return NextResponse.json({ exists });
// // }

// // //유저 조회 후 이름, 이메일만 반환
// // export async function GET() {
// //   await connectDB();
// //   const users = await User.find().select("email name");
// //   return NextResponse.json(users);
// // }

// // //populate
// // export async function GET() {
// //   await connectDB();
// //   const users = await User.find().populate("profile");
// //   return NextResponse.json(users);
// // }
