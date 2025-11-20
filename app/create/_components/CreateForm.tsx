"use client";
import ErrorMessage from "@/components/common/ErrorMessage";
import { MainTitle, Subtitle, TitleTag } from "@/components/common/Title";
import { Button } from "@/components/ui/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils"; // 추가
import { useCheckDuplicate } from "@/app/signin/_query/useCheckDuplicate";

type FormValues = {
  emoji: string;
  diary: string;
};

const EMOJI_OPTIONS = [
  { emoji: "😢", comment: "오늘은 조금 슬픈 날이에요." },
  { emoji: "😡", comment: "오늘은 화가 나는 날이에요." },
  { emoji: "😴", comment: "오늘은 피곤한 날이에요." },
  { emoji: "😊", comment: "오늘은 기분 좋은 날이에요." },
  { emoji: "😀", comment: "오늘은 행복한 날이에요." },
];

const CreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      emoji: "",
      diary: "",
    },
  });

  const selectedEmoji = watch("emoji");

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const handleEmojiSelect = (emoji: string) => {
    setValue("emoji", emoji, { shouldValidate: true });
  };

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <TitleTag>Keep a Diary!</TitleTag>
          {/* <MainTitle>오늘의 감정 일기</MainTitle> */}
        </div>
        <div>
          <Subtitle className="mb-2">오늘의 감정 스티커</Subtitle>
          <div className="flex flex-col gap-2">
            <input
              type="hidden"
              {...register("emoji", { required: "감정을 선택해 주세요." })}
            />
            {EMOJI_OPTIONS.map(({ emoji, comment }) => {
              const active = selectedEmoji === emoji;
              return (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiSelect(emoji)}
                  className={cn(
                    "w-full rounded-md h-10 flex items-center gap-2 px-4 transition border",
                    active
                      ? "bg-mood-red text-white border-mood-red"
                      : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
                  )}
                  aria-pressed={active}
                >
                  <div className="text-xl">{emoji}</div>
                  <div className="text-sm">{comment}</div>
                </button>
              );
            })}
          </div>
          {errors.emoji && <ErrorMessage>{errors.emoji.message}</ErrorMessage>}
        </div>

        <div>
          <Subtitle className="mb-2">오늘의 일기</Subtitle>
          <textarea
            placeholder="여러분의 오늘을 자유롭게 기록해주세요."
            {...register("diary", {
              required: "여러분의 오늘을 자유롭게 기록해주세요.",
              minLength: {
                value: 1,
                message: "오늘을 기억하기 위해, 한 글자 이상 작성해볼까요?",
              },
            })}
            rows={6}
            className="bg-gray-100 rounded-md p-4 w-full resize-none"
          />
          {errors.diary && <ErrorMessage>{errors.diary.message}</ErrorMessage>}
        </div>

        <Button
          variant={"moodRed"}
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? "기록 중..." : "기록 완료"}
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
