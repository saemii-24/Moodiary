"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCheckDuplicate } from "./_query/useCheckDuplicate";
import ErrorMessage from "@/components/common/ErrorMessage";

type Signin = {
  userId: string;
  password: string;
  confirmPassword: string;
};

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Signin>();

  const onSubmit: SubmitHandler<Signin> = (data) => {
    // 비밀번호 일치 검증 (추가 안전장치)
    if (data.password !== data.confirmPassword) {
      alert("비밀번호가 서로 일치하지 않습니다.");
      return;
    }
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
    refetchDuplicate()
      .then(() => {
        console.log(isDuplicate);
      })
      .catch((error) => {
        console.error("Error checking duplicate:", error);
      });
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isPasswordMismatch =
    !!confirmPassword && !!password && password !== confirmPassword;
  const canSubmit =
    !!password && !!confirmPassword && !isPasswordMismatch && !isDuplicate;

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
            autoComplete="new-password"
            {...register("password", { required: "비밀번호를 입력해주세요." })}
            error={errors.password?.message}
          />
          {/* 비밀번호 확인 */}
          <Input
            type="password"
            placeholder="비밀번호 확인"
            uiSize="md"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력해주세요.",
            })}
            error={errors.confirmPassword?.message}
          />
          {isPasswordMismatch && (
            <ErrorMessage className="text-xs">
              입력한 두 비밀번호가 서로 다릅니다.
            </ErrorMessage>
          )}
        </div>
        {/* 제출 */}
        <Button
          type="submit"
          variant="moodRed"
          size="lg"
          className="w-full mt-4 font-medium"
          disabled={!canSubmit}
        >
          가입 후 기록 시작하기
        </Button>
        {isDuplicate !== undefined && (
          <p className="text-xs mt-2 text-gray-500">
            {isDuplicate
              ? "이미 사용 중인 아이디입니다."
              : "사용 가능한 아이디입니다."}
          </p>
        )}
        {!canSubmit && (
          <p className="text-[11px] mt-2 text-gray-400">
            아이디 중복 여부와 두 비밀번호가 일치해야 가입할 수 있습니다.
          </p>
        )}
      </form>
    </div>
  );
}
