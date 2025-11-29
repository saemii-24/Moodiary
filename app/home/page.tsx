"use client";
import FeelingCalendar from "@/components/common/FeelingCalendar";
import { Subtitle } from "@/components/common/Title";
import DailyDiary from "./_component/DailyDiary";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const nickname = session?.user?.nickname || "사용자";
  console.log("session", session);

  return (
    <div className="min-h-screen py-10 ">
      <div className=" bg-mood-red px-4 py-5 rounded-xl *:text-white">
        <Subtitle>{nickname} 님과 함께하는 오늘의 기록</Subtitle>
        <h3>오늘 기록을 시작해볼까요?</h3>
      </div>

      <div className="mt-4 font-semibold">
        <FeelingCalendar />
        <DailyDiary />
      </div>
    </div>
  );
}
