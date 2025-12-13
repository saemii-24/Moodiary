"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import { Pencil } from "lucide-react";
import { Subtitle } from "@/components/common/Title";
import { useSession } from "next-auth/react";

export default function MyPage() {
  const { data: session } = useSession();
  const nickname = session?.user?.nickname || "사용자";
  console.log("session", session);

  return (
    <div className="min-h-screen bg-white">
      <main className="px-5 py-8">
        {/* Profile + Meta */}
        <div className="flex items-center gap-5">
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

            {/* Stats (inline) */}
            <div className="mt-3 flex gap-6 text-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-neutral-400">총 기록</span>
                <span className="font-semibold">32일</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-neutral-400">연속 기록</span>
                <span className="font-semibold">5일</span>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 h-px bg-neutral-200" />

        <div>
          <Subtitle>나의 기록</Subtitle>
          <ul className="flex flex-col divide-y">
            <li className="flex items-center justify-between py-4 cursor-pointer hover:bg-neutral-50 transition">
              <span className="text-base">이번 주 기록 보기</span>
            </li>
            <li className="flex items-center justify-between py-4 cursor-pointer hover:bg-neutral-50 transition">
              <span className="text-base">전체 기록 보기</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
