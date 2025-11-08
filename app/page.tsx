import Image from "next/image";
import FeelingLineChart from "@/components/FeelingLineChart";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-zinc-800 dark:text-white">
          Moodiary
        </h1>
        {/* AI 문구 추가 */}
        <p>안녕하세요 @@님. 오늘을 잘 보내고 있나요?</p>
        <FeelingLineChart />
      </div>
    </div>
  );
}
