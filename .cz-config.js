module.exports = {
  types: [
    { value: "🚀 feat", name: "🚀 feat:       새로운 기능 추가" },
    { value: "🐛 fix", name: "🐛 fix:        버그 수정" },
    { value: "♻️ refactor", name: "♻️ refactor:   리팩토링 (기능 변화 없음)" },
    { value: "📝 docs", name: "📝 docs:       문서 수정 (README 등)" },
    {
      value: "🎨 style",
      name: "🎨 style:      코드 스타일 변경 (포맷, 공백 등)",
    },
    { value: "✅ test", name: "✅ test:        테스트 코드 추가/수정" },
    {
      value: "🔧 config",
      name: "🔧 config:      설정 파일 수정 (ESLint, Babel 등)",
    },
    {
      value: "💄 design",
      name: "💄 design:      UI/디자인 수정 (기능 변화 없음)",
    },
    { value: "🔀 rename", name: "🔀 rename:      파일/폴더 이름 변경" },
    {
      value: "🧹 chore",
      name: "🧹 chore:       기타 변경 (패키지 정리, 주석 등)",
    },
    { value: "⚙️ ci", name: "⚙️ ci:          CI/CD 관련 설정 변경" },
    { value: "🎉 init", name: "🎉 init:        초기 커밋" },
    { value: "🔀 merge", name: "🔀 merge:       브랜치 병합" },
  ],
  messages: {
    type: "어떤 종류의 변경인가요?:",
    scope: "변경 범위(옵션):",
    subject: "제목:\n",
    body: "본문 (Optional):\n",
    footer: "이슈 번호(Optional):",
    confirmCommit: "이 커밋 메시지로 커밋할까요?",
  },
  skipQuestions: ["breaking", "scope"],
  footerPrefix: "",
};
