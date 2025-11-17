"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const moodData: Record<string, string> = {
  "2025-11-01": "😀",
  "2025-11-02": "😢",
  "2025-11-03": "😡",
  "2025-11-04": "😴",
  "2025-11-05": "😊",
};

const FeelingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 날짜별 이모지 반환
  const renderDayContents = (day: number, date?: Date) => {
    if (!date) return day;
    const key = date.toISOString().split("T")[0];
    const mood = moodData[key];
    return (
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs">{day}</span>
        {mood && <span className="text-lg">{mood}</span>}
      </div>
    );
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-center text-lg font-semibold mb-2">
        이번 달의 감정 캘린더
      </h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        renderDayContents={renderDayContents}
        calendarClassName="w-full"
      />
    </div>
  );
};

export default FeelingCalendar;
