import React from "react";

const feelings = [
  { id: 1, name: "행복", emoji: "😊" },
  { id: 2, name: "슬픔", emoji: "😢" },
  { id: 3, name: "분노", emoji: "😠" },
  { id: 4, name: "불안", emoji: "😟" },
  { id: 5, name: "평온", emoji: "😌" },
];

const Step = () => {
  return (
    <div>
      <div>오늘의 감정 PICK</div>
      <ul>
        {feelings.map((feeling) => (
          <li key={feeling.id}>
            {feeling.emoji} {feeling.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Step;
