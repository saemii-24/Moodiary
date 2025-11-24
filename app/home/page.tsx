import Container from "@/components/common/Container";
import FeelingCalendar from "@/components/common/FeelingCalendar";
import { Subtitle } from "@/components/common/Title";
import DailyDiary from "./_component/DailyDiary";

export default function Home() {
  return (
    <div className="min-h-screen py-10 ">
      <div className=' bg-mood-red px-4 py-5 rounded-xl *:text-white'>
        <Subtitle>철수 님과 함께하는 오늘의 기록</Subtitle>
        <h3>오늘 기록을 시작해볼까요?</h3>
      </div>

      <div className='mt-4 font-semibold'>
        <FeelingCalendar />
        <DailyDiary/>
      </div>
    </div>
  );
}
