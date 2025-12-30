"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import { Calendar, Calendar1, Library, Pencil, PenTool } from "lucide-react";
import { Subtitle } from "@/components/common/Title";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MyPage() {
  const { data: session } = useSession();
  const nickname = session?.user?.nickname || "사용자";
  console.log("session", session);

  return (
    <div className="min-h-screen bg-white">
      <main className="">
        {/* Profile + Meta */}
        <div className="flex items-center gap-5 px-5 py-8">
          <Avatar className="h-20 w-20">
            {/* <AvatarImage src={user.profileImage} /> */}
            <AvatarFallback>{nickname}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight">
                {nickname}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-neutral-100"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-neutral-400 mt-1">마지막 기록일 ·</p>

          </div>


        </div>



        {/* Stats (inline) */}
        <div className="mt-3 flex gap-6 text-sm -mx-4 px-6 bg-mood-gray py-6">
          <div className="flex items-baseline gap-2">
            <span className="text-neutral-400">총 기록</span>
            <span className="font-semibold">32일</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-neutral-400">연속 기록</span>
            <span className="font-semibold">5일</span>
          </div>
        </div>
        <div className="mt-3">
          <ul className="flex items-center justify-between">
            <li className="gap-2 flex items-center justify-between">
              <Button className="flex gap-2 items-center"
                variant="ghost">
                <Calendar size="16" /> <span className="text-sm">이번 주 기록 보기</span>
              </Button>
            </li>
            <li className="gap-2 flex items-center justify-between">
              <Button className="flex gap-2 items-center"
                variant="ghost"><Calendar1 size="16" />  <span className="text-sm">전체 기록 보기</span></Button>
            </li>
            <li className="gap-2 flex items-center justify-between">
              <Link href="/post">
                <Button className="flex gap-2 items-center"

                  variant="ghost"><PenTool size="16" />  <span className="text-sm">새로 기록 하기</span></Button>
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
