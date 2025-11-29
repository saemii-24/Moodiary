export default function randomName(): string {
  const adjectives = [
    "행복한",
    "즐거운",
    "사랑스러운",
    "멋진",
    "빛나는",
    "따뜻한",
    "기쁜",
    "평화로운",
    "신나는",
    "포근한",
  ];
  const animals = [
    "토끼",
    "고양이",
    "강아지",
    "여우",
    "곰",
    "사자",
    "호랑이",
    "펭귄",
    "다람쥐",
    "돌고래",
    "부엉이",
  ];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  return randomAdjective + " " + randomAnimal;
}
