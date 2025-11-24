"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const emojis = ["😀", "😊", "😢", "😡", "😴", "😆", "😍", "😥"];

const EditFeelingPage = () => {
  const [date] = useState("2025-11-24"); // 기존 날짜
  const [emoji, setEmoji] = useState("😊"); // 기존 감정
  const [title, setTitle] = useState("오늘은 정말 행복한 날!");
  const [content, setContent] = useState(
    "좋아하는 음식을 먹고 가족들과 행복한 하루!"
  );

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 space-y-6">
      {/* 날짜 */}
      <div className="text-sm text-gray-500">{date}</div>

      {/* 감정 이모지 선택 */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">오늘의 감정</div>
        <div className="text-4xl">{emoji}</div>
      </div>

      {/* 감정 선택 Grid */}
      <div className="grid grid-cols-6 gap-2">
        {emojis.map((e, i) => (
          <button
            key={i}
           className={cn(
                    "text-2xl p-2 border rounded-md transition",
                    emoji === e
                        ? "bg-yellow-200 border-yellow-400"
                        : "bg-white"
                    )}
            onClick={() => setEmoji(e)}
          >
            {e}
          </button>
        ))}
      </div>

      {/* 제목 입력 */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">제목</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-base"
        />
      </div>

      {/* 내용 입력 */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">내용</label>
        <Textarea
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-base"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1">
          취소
        </Button>
        <Button className="flex-1 bg-mood-red text-white">
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default EditFeelingPage;
