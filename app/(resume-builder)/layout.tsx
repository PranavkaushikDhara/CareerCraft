import React from "react";
import ResumeNav from "@/components/molecules/ResumeNav";
import Navbar from "@/components/molecules/Navbar";

interface Props {
  children: React.ReactNode;
}

const BuilderLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-screen text-CareerCraftWhite">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block">
          <ResumeNav />
        </aside>
        <main className="w-full overflow-y-auto">
          {/* Mobile navigation indicator */}
          <div className="md:hidden p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-CareerCraftWhite">
              Resume Builder
            </h2>
            <p className="text-sm text-CareerCraftText">
              Use desktop view for full navigation
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default BuilderLayout;
