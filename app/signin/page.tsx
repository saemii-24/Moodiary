import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-sm bg-white flex flex-col">
        <div className="mt-6 space-y-4">
          <Input
            placeholder="이메일 또는 아이디"
            uiSize="md"
            autoComplete="username"
          />
          <Input
            type="password"
            placeholder="비밀번호"
            uiSize="md"
            autoComplete="current-password"
          />
        </div>

        <Button
          variant="moodCoral"
          size="lg"
          className="w-full mt-4 font-medium"
        >
          로그인
        </Button>
      </div>
    </div>
  );
}
