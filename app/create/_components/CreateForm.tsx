import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  emoji: string;
  diary: string;
};

const EMOJI_OPTIONS = ["😢", "😡", "😴", "😊", "😀"];

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
        <div>오늘의 감정 이모티콘</div>
        <input
          type="hidden"
          {...register("emoji", { required: "감정을 선택해 주세요." })}
        />
        {EMOJI_OPTIONS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => handleEmojiSelect(emoji)}
            style={{
              border:
                selectedEmoji === emoji ? "2px solid #333" : "1px solid #ccc",
              padding: "8px 12px",
              marginRight: "8px",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
          >
            {emoji}
          </button>
        ))}
        {errors.emoji && (
          <p style={{ color: "red", marginTop: "4px" }}>
            {errors.emoji.message}
          </p>
        )}

        <div style={{ marginTop: "16px" }}>오늘의 일기</div>
        <textarea
          placeholder="오늘의 일기를 작성해 주세요."
          {...register("diary", {
            required: "오늘의 일기를 작성해 주세요.",
            minLength: {
              value: 1,
              message: "오늘을 기록하기 위해 한 글자 이상 작성해주세요.",
            },
          })}
          rows={6}
          style={{ width: "100%", resize: "vertical", padding: "8px" }}
        />
        {errors.diary && (
          <p style={{ color: "red", marginTop: "4px" }}>
            {errors.diary.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ marginTop: "16px", padding: "10px 16px", cursor: "pointer" }}
        >
          {isSubmitting ? "기록 중..." : "기록 완료"}
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
