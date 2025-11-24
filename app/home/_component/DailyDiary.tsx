"use client";

import { Button } from "@/components/ui/Button";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const mockDiary = {
  date: "2025-11-24",
  emotion: "😊",
  title: "오늘은 정말 행복한 날!",
  content: "좋아하는 음식을 막고 가족들과 행복한 하루!",
};

const DailyDiary = () => {
  const [diary, setDiary] = useState(mockDiary); 

  return (
    <div className="">
      {/* 상단*/}
      <div className='flex w-full justify-between items-center'>
        {/* 날짜  */}
          <div className="text-xs font-regular text-gray-500">
            {diary.date}
          </div>
          {/* 감정 이모지 */}
          <div className="flex justify-center my-4">
            <span className="text-5xl">{diary.emotion}</span>
          </div>
      </div>

      {/* 하단 */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700">
            {diary.title}
        </h2>

        {/* 내용 */}
        <p className="text-sm text-gray-500">{diary.content}</p>

        {/* 수정/삭제 버튼 (임시로 추가) */}
        <div className="mt-6 flex justify-between">
            <Button
            variant={'outline'}
            size='sm'
            onClick={() => alert("다이어리 수정 화면으로 이동")}
            className="px-4 py-2   rounded-md"
            >
                 <Pencil size={14} />
            </Button>
            <Button
            variant={'outline'}
            size='sm'
            onClick={() => alert("다이어리 삭제")}
            className="px-4 py-2   rounded-md"
            >
                <Trash2 size={14} />
            </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyDiary;
