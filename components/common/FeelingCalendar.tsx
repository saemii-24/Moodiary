"use client";

import React, { useState } from "react";
import { startOfDay } from "date-fns";

import {
  startOfMonth,
  endOfMonth,
  addDays,
  format,
  isSameMonth,
  getDay,
} from "date-fns";
import { ko } from "date-fns/locale";
import { TitleTag } from "./Title";
import { cn } from "@/lib/utils";

const moodData: Record<string, string> = {
  "2025-11-01": "😀",
  "2025-11-02": "😢",
  "2025-11-03": "😡",
  "2025-11-04": "😴",
  "2025-11-05": "😊",
};

const formatKey = (date: Date) => date.toLocaleDateString("en-CA");

const FeelingCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  // 주(월~토) 단위로 달력을 구성하는 헬퍼
  const buildWeeks = () => {
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    // 첫 주의 월요일 찾기
    let firstMonday = monthStart;
    while (getDay(firstMonday) !== 1) {
      firstMonday = addDays(firstMonday, -1);
    }
    // 마지막 주의 토요일 찾기
    let lastSaturday = monthEnd;
    while (getDay(lastSaturday) !== 6) {
      lastSaturday = addDays(lastSaturday, 1);
    }

    const weeks: Date[][] = [];
    let cursor = firstMonday;
    let currentWeek: Date[] = [];

    while (cursor <= lastSaturday) {
      // 일요일은 건너뜀
      if (getDay(cursor) === 0) {
        cursor = addDays(cursor, 1);
        continue;
      }
      if (getDay(cursor) === 1 && currentWeek.length) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(cursor);
      if (getDay(cursor) === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      cursor = addDays(cursor, 1);
    }
    if (currentWeek.length) weeks.push(currentWeek);
    return weeks;
  };

  const weeks = buildWeeks();

  const handleSelect = (date: Date) => setSelectedDate(date);

  return (
    <div className="w-full flex flex-col items-center ">
      {/* <TitleTag className="">2025</TitleTag> */}
      <div className="mt-[-8px] font-semibold pb-6 text-2xl text-center pt-4">
        {format(today, "MM월", { locale: ko })}
      </div>
      <div className="flex-1 flex flex-col px-2 pb-4 w-full">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-6 text-center text-sm font-medium mb-2">
          {["월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        {/* 날짜 */}
        {/* 날짜 */}
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-6 gap-1">
              {week.map((date, di) => {
                const key = formatKey(date);
                const mood = moodData[key];

                const isPast = date < startOfDay(today);          // 오늘 이전
                const isFutureOrToday = date >= startOfDay(today); // 오늘 이후

             
                return (
                  <button
                    key={di}
                    onClick={() => handleSelect(date)}
                    className={`flex flex-col items-center justify-center py-2 rounded-md 
                      text-xs gap-1 transition 
                    `}
                  >
                    <span>{format(date, "d")}</span>

                    {/* mood 없으면 gray circle */}
                    {mood ? (
                      <span className="text-2xl leading-none">{mood}</span>
                    ) : (
                      <span className={cn("inline-block size-8 rounded-full bg-gray-200",{
                        'bg-mood-cream': !isPast
                      })} />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeelingCalendar;
