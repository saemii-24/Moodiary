"use client";

import { Subtitle } from "@/components/common/Title";
import CarouselCard from "@/components/ui/CarouselCard";

export default function WeeklyDiary() {
  const diaryItems = [
    {
      date: "2026-01-01",
      title: "새 프로젝트 시작",
      content: "오늘부터 새로운 프로젝트를 시작했다. 기대된다!",
    },
    {
      date: "2026-01-02",
      title: "회의, 회의, 회의!",
      content:
        "회의가 길어져 거의 6시간동안 이야기했더니 목이 너무 아프다 ㅠㅠ",
    },
    {
      date: "2026-01-03",
      title: "리팩토링 및 정리",
      content:
        "작년에 만든 프로젝트 중 필요한 부분에 있어 리팩토링을 진행했다.",
    },
    {
      date: "2026-01-04",
      title: "관계대명사 공부 두 번째 시간",
      content:
        "관계대명사를 배우고 문맥 속 자연스러운 사용을 연습했다. 너무 어렵다...",
    },
  ];

  const items = diaryItems.map((item, index) => (
    <div className="w-full flex flex-col" key={index}>
      <p className="text-sm ">{item.date}</p>
      <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
      <p className=" mt-2 line-clamp-3">{item.content}</p>
    </div>
  ));

  return (
    <div className="w-full space-y-2">
      <Subtitle>이번 주 기록</Subtitle>
      <CarouselCard items={items} />
    </div>
  );
}
