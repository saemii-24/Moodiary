import Container from "@/components/common/Container";
import FeelingCalendar from "@/components/common/FeelingCalendar";
import { ArrowRight, ChevronRightIcon } from "lucide-react";

export default function Home() {
  return (
    <Container>
      <div>철수 님과 함께하는 오늘의 기록</div>
      <h1>오늘 기록을 시작해볼까요?</h1>
      <ArrowRight />

      <div>
        <h2>이번 달 기록 현황</h2>
        <FeelingCalendar />
      </div>
    </Container>
  );
}
