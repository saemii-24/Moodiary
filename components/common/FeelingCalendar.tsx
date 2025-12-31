"use client";

import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  subMonths,
  format,
  getDay,
  startOfDay,
  isSameMonth,
} from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

const moodData: Record<string, string> = {
  "2025-11-01": "😀",
  "2025-11-02": "😢",
  "2025-11-03": "😡",
  "2025-11-04": "😴",
  "2025-11-05": "😊",
};

const formatKey = (date: Date) =>
  date.toLocaleDateString("en-CA"); // YYYY-MM-DD

const FeelingCalendar = () => {
  const today = new Date();

  // 🔹 현재 보고 있는 기준 월
  const [currentMonth, setCurrentMonth] = useState(
    startOfMonth(today)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    today
  );

  /** 월~토 기준 주 단위 달력 생성 */
  const buildWeeks = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    // 첫 주의 월요일
    let firstMonday = monthStart;
    while (getDay(firstMonday) !== 1) {
      firstMonday = addDays(firstMonday, -1);
    }

    // 마지막 주의 토요일
    let lastSaturday = monthEnd;
    while (getDay(lastSaturday) !== 6) {
      lastSaturday = addDays(lastSaturday, 1);
    }

    const weeks: Date[][] = [];
    let cursor = firstMonday;
    let currentWeek: Date[] = [];

    while (cursor <= lastSaturday) {
      // 일요일 제거
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

  const isNextDisabled =
    startOfMonth(currentMonth) >= startOfMonth(today);

  return (
    <div className="w-full flex flex-col items-center">
      {/* 🔹 헤더: 월 이동 */}
      <div className="flex items-center justify-between w-full px-4 pt-4 pb-6">
        <button
          onClick={() =>
            setCurrentMonth((prev) => subMonths(prev, 1))
          }
          className="text-xl font-bold"
        >
          <ChevronLeft />
        </button>

        <div className="text-xl font-semibold">
          {format(currentMonth, "yyyy년 MM월", { locale: ko })}
        </div>

        <button
          onClick={() =>
            setCurrentMonth((prev) => addMonths(prev, 1))
          }
          disabled={isNextDisabled}
          className={cn(
            "text-xl font-bold",
            isNextDisabled &&
            "opacity-30 pointer-events-none"
          )}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-2 pb-4 w-full">
        {/* 요일 */}
        <div className="grid grid-cols-6 text-center text-sm font-medium mb-2">
          {["월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* 날짜 */}
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-6 gap-1">
              {week.map((date, di) => {
                const key = formatKey(date);
                const mood = moodData[key];

                const isPast = date < startOfDay(today);
                const isOtherMonth = !isSameMonth(
                  date,
                  currentMonth
                );
                const isSelected =
                  selectedDate &&
                  formatKey(selectedDate) === key;

                return (
                  <button
                    key={di}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "flex flex-col items-center justify-center py-2 rounded-md text-xs gap-1 transition",
                      isSelected &&
                      "bg-primary/10 ring-1 ring-primary",
                      isOtherMonth &&
                      "opacity-30 pointer-events-none"
                    )}
                  >
                    <span>{format(date, "d")}</span>

                    {mood ? (
                      <span className="text-2xl leading-none">
                        {mood}
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "inline-block size-8 rounded-full bg-gray-200",
                          !isPast && "bg-mood-cream"
                        )}
                      />
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
