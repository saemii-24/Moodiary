import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center py-10 px-4 ">
      <div className="w-full max-w-sm h-full flex flex-col">
        <div className="flex-1">
          <div className="space-y-1 mt-10">
            <div className="text-xs text-mood-red border-mood-red p-1 px-2 rounded-full border w-fit">
              Moodiary
            </div>
            <h1 className="text-3xl mt-2 font-medium tracking-tight text-mood-red">
              오늘의 마침표
            </h1>
            <h2 className="text-3xl font-semibold -mt-1  text-mood-red">
              나의 무드 다이어리
            </h2>
            <p className="text-md mt-1 text-mood-red">
              반가워요! 오늘 기록을 시작해볼까요?
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <div className=" space-y-3">
            <Link href="/signin">
              <Button
                size="lg"
                variant={"moodRed"}
                className="w-full font-medium"
              >
                로그인하기
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-[11px] text-gray-400">또는</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="text-center">
            <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              안전하게 회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
