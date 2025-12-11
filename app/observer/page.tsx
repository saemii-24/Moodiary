"use client";

import { useState } from "react";

export default function Observer() {
  const [click, setClick] = useState(false);
  return (
    <div className="w-screen h-screen items-center justify-center">
      <button
        onClick={() => {
          setClick(!click);
        }}
        className="px-3 py-2 rounded-2xl bg-red-500 text-white"
      >
        확인 버튼!
      </button>
    </div>
  );
}
