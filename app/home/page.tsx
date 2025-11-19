import Container from "@/components/common/Container";
import FeelingCalendar from "@/components/common/FeelingCalendar";
import { Subtitle } from "@/components/common/Title";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <Container className="bg-mood-light">
      <Subtitle>철수 님과 함께하는 오늘의 기록</Subtitle>
      <h3>오늘 기록을 시작해볼까요?</h3>
      <ArrowRight />

      <div>
        <h2>이번 달 기록 현황</h2>
        <FeelingCalendar />
      </div>
    </Container>
  );
}
