"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useSignin } from "./_query/useSignin";
import { useEffect } from "react";

type Signin = {
  userId: string;
  password: string;
};

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Signin>({ mode: "onChange" });

  const { mutate: signin, isPending, isSuccess, isError, error } = useSignin();

  const onSubmit: SubmitHandler<Signin> = (data) => {
    signin(data);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/";
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <div className="text-xs text-mood-red border-mood-red p-1 px-2 rounded-full mb-3 border w-fit">
        Login
      </div>

      <h2 className="text-3xl font-semibold -mt-1 text-mood-red">Moodiary</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white flex flex-col"
      >
        <div className="mt-6 space-y-4">
          <Input
            placeholder="아이디"
            uiSize="md"
            autoComplete="username"
            {...register("userId", { required: "아이디를 입력해주세요." })}
            error={errors.userId?.message}
          />

          <Input
            type="password"
            placeholder="비밀번호"
            uiSize="md"
            autoComplete="current-password"
            {...register("password", { required: "비밀번호를 입력해주세요." })}
            error={errors.password?.message}
          />
        </div>

        <Button
          type="submit"
          variant="moodRed"
          size="lg"
          className="w-full mt-4 font-medium"
          disabled={!isValid || isPending}
        >
          {isPending
            ? "로그인 중..."
            : isSuccess
            ? "로그인 완료!"
            : "로그인 후 기록 시작하기"}
        </Button>

        {isError && error && (
          <ErrorMessage className="text-xs mt-2">{error.message}</ErrorMessage>
        )}
      </form>
    </div>
  );
}
