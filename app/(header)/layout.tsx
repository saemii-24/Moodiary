import Header from "@/components/common/Header";
import React from "react";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-2  px-4">{children}</main>
    </div>
  );
};

export default layout;
