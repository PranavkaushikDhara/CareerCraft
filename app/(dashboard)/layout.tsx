"use client";
import SideNav from "@/components/molecules/SideNav";
import Navbar from "@/components/molecules/Navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-screen text-CareerCraftWhite">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block">
          <SideNav />
        </aside>
        <main className="w-full overflow-y-auto">
          {/* Mobile navigation indicator */}
          <div className="md:hidden p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-CareerCraftWhite">
              Dashboard
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

export default DashboardLayout;
