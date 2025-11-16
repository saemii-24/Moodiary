import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SigninPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <div className="text-xs text-mood-red border-mood-red p-1 px-2 rounded-full mb-3 border w-fit">
        Welcome
      </div>
      <h2 className="text-3xl font-semibold -mt-1  text-mood-red">Moodiary</h2>
      <div className="w-full max-w-sm bg-white flex flex-col">
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Input placeholder="아이디" uiSize="md" autoComplete="username" />
            <Button>중복확인</Button>
          </div>
          <Input
            type="password"
            placeholder="비밀번호"
            uiSize="md"
            autoComplete="current-password"
          />
        </div>

        <Button variant="moodRed" size="lg" className="w-full mt-4 font-medium">
          기록 시작하기
        </Button>
      </div>
    </div>
  );
}
