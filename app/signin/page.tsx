"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCheckDuplicate } from "./_query/useCheckDuplicate";

type Signin = {
  userId: string;
  password: string;
};

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Signin>();

  const onSubmit: SubmitHandler<Signin> = (data) => {
    console.log("submit:", data);
  };

  // hook
  const {
    isDuplicate,
    isLoading: isDuplicateLoading,
    refetch: refetchDuplicate,
  } = useCheckDuplicate({ userId: watch("userId") || "" });

  const duplicateCheck = () => {
    const id = watch("userId");

    if (!id) {
      alert("아이디를 입력해주세요.");
      return;
    }

    // refetch 실행
    refetchDuplicate();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <div className="text-xs text-mood-red border-mood-red p-1 px-2 rounded-full mb-3 border w-fit">
        Welcome
      </div>

      <h2 className="text-3xl font-semibold -mt-1 text-mood-red">Moodiary</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white flex flex-col"
      >
        <div className="mt-6 space-y-4">
          {/* 아이디 + 중복확인 */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="아이디"
              uiSize="md"
              autoComplete="username"
              {...register("userId")}
            />

            <Button
              type="button"
              onClick={duplicateCheck}
              disabled={isDuplicateLoading}
            >
              {isDuplicateLoading ? "확인 중..." : "중복확인"}
            </Button>
          </div>

          {/* 비밀번호 */}
          <Input
            type="password"
            placeholder="비밀번호"
            uiSize="md"
            autoComplete="current-password"
            {...register("password")}
          />
        </div>
        {/* 제출 */}
        <Button
          type="submit"
          variant="moodRed"
          size="lg"
          className="w-full mt-4 font-medium"
        >
          기록 시작하기
        </Button>
        {isDuplicate !== undefined && (
          <p className="text-xs mt-2 text-gray-500">
            {isDuplicate
              ? "이미 사용 중인 아이디입니다."
              : "사용 가능한 아이디입니다."}
          </p>
        )}
      </form>
    </div>
  );
}
