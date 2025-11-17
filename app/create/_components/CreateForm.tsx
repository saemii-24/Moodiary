"use client";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Button } from "@/components/ui/Button";
import React from "react";
import { useForm } from "react-hook-form";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <div className="text-xs text-mood-red border-mood-red p-1 px-2 rounded-full mb-3 border w-fit">
            Keep a Diary!
          </div>
          <h2 className="text-3xl font-semibold -mt-1 text-mood-red">
            오늘의 감정 일기
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="hidden"
            {...register("emoji", { required: "감정을 선택해 주세요." })}
          />
          {EMOJI_OPTIONS.map(({ emoji, comment }, key) => (
            <button
              className="w-full bg-gray-100 rounded-md h-12 flex items-center gap-2 px-4 text-gray-600"
              key={emoji}
              type="button"
              onClick={() => handleEmojiSelect(emoji)}
            >
              <div>{emoji}</div>
              <div>{comment}</div>
            </button>
          ))}
        </div>
        {errors.emoji && <ErrorMessage>{errors.emoji.message}</ErrorMessage>}

        <div className="text-lg font-semibold">오늘의 일기</div>
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
          className="bg-gray-100 rounded-md p-4 w-full resize-none "
        />
        {errors.diary && <ErrorMessage>{errors.diary.message}</ErrorMessage>}

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
