"use client";
import FeelingCalendar from "@/components/common/FeelingCalendar";
import { Subtitle } from "@/components/common/Title";
import DailyDiary from "./_component/DailyDiary";
import { useSession } from "next-auth/react";
import CarouselCard from "@/components/ui/CarouselCard";
import WeeklyDiary from "./_component/WeeklyDiary";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const nickname = session?.user?.nickname || "사용자";
  const router = useRouter();
  return (
    <div className="min-h-screen py-10 ">
      <div
        onClick={() => router.push("/post")}
        className=" bg-mood-red px-4 py-5 rounded-xl *:text-white"
      >
        <Subtitle>{nickname} 님과 함께하는 오늘의 기록</Subtitle>
        <h3>오늘 기록을 시작해볼까요?</h3>
      </div>

      <div className="mt-4 font-semibold">

        <Subtitle>감정 캘린더</Subtitle>
        <FeelingCalendar />
        {/* <DailyDiary /> */}
        <WeeklyDiary />
      </div>
    </div>
  );
}
