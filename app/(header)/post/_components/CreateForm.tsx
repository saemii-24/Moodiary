"use client";
import { useForm } from "react-hook-form";
import { useCreatePost } from "@/app/(header)/post/_query/useCreatePost";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { MainTitle, TitleTag } from "@/components/common/Title";

type FormValues = {
  emoji: string;
  title: string;
  diary: string;
};

const EMOJI_OPTIONS = [
  { emoji: "😢", comment: "오늘은 조금 슬픈 날이에요." },
  { emoji: "😡", comment: "오늘은 화가 나는 날이에요." },
  { emoji: "😴", comment: "오늘은 피곤한 날이에요." },
  { emoji: "😊", comment: "오늘은 기분 좋은 날이에요." },
  { emoji: "😀", comment: "오늘은 행복한 날이에요." },
];

const CreateForm = () => {
  const userId = "test";
  const form = useForm<FormValues>({
    defaultValues: { emoji: "", title: "", diary: "" },
  });
  const { createPost, isPending } = useCreatePost();

  const onSubmit = (values: FormValues) => {
    createPost(
      {
        userId,
        date: new Date().toISOString(),
        feeling: values.emoji,
        title: values.title,
        content: values.diary,
      },
      {
        onSuccess: () => {
          toast.success("기록 완료", {
            description: "오늘의 기록이 저장됐습니다.",
          });
          form.reset();
        },
        onError: (err) => {
          toast.error("등록 실패", {
            description: err.message || "잠시 후 다시 시도해 주세요.",
          });
        },
      }
    );
  };

  return (
    <div className="py-10">
      <TitleTag>Keep a Diary!</TitleTag>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* 감정 선택 */}
            <FormField
              control={form.control}
              name="emoji"
              rules={{ required: "감정을 선택해 주세요." }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>오늘의 감정 스티커</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-2"
                    >
                      {EMOJI_OPTIONS.map(({ emoji, comment }) => {
                        const id = `emoji-${emoji}`;
                        return (
                          <div
                            key={emoji}
                            className="flex items-center gap-3 rounded-md border px-4 py-2"
                          >
                            <RadioGroupItem value={emoji} id={id} />
                            <Label
                              htmlFor={id}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <span className="text-xl">{emoji}</span>
                              <span className="text-sm text-muted-foreground">
                                {comment}
                              </span>
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 제목 */}
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "제목을 입력해주세요." }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="오늘의 제목을 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 일기 */}
            <FormField
              control={form.control}
              name="diary"
              rules={{ required: "여러분의 오늘을 자유롭게 기록해주세요." }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>오늘의 일기</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      uiSize="sm"
                      placeholder="여러분의 오늘을 자유롭게 기록해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="moodRed"
              className="w-full"
              disabled={isPending || !userId}
            >
              {isPending ? "기록 중..." : "기록 완료"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateForm;
