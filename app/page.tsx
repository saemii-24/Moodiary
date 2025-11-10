import Image from "next/image";
import FeelingLineChart from "@/components/FeelingLineChart";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* AI 문구 추가 */}
      <p>
        안녕하세요 <span className="text-mood-coral">주주</span>님.
        <br /> 행복한 11월 10일을 보내고 계신가요?
      </p>
      <FeelingLineChart />
    </div>
  );
}
