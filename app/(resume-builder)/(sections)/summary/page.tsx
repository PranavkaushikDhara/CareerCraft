"use client";

import React, { useEffect, useState } from "react";
import useResumeStore from "@/store/ResumeStore";
import SummaryForm from "@/components/molecules/forms/SummaryForm";

const Summary = () => {
  const [summaryData, setSummaryData] = useState("");
  const summaryStore = useResumeStore.getState().summary;
  console.log(summaryStore);
  useEffect(() => {
    const resumeData = localStorage.getItem("resumeData");
    if (resumeData) {
      try {
        const parsedData = JSON.parse(resumeData).summary || "";
        setSummaryData(parsedData);
      } catch (error) {
        console.error("Error parsing resume data:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-CareerCraftWhite">
          Professional Summary
        </h1>
        <p className="text-base text-CareerCraftText">
          Write a brief summary highlighting your key professional achievements
          and career goals.
        </p>
      </header>
      <div className=" rounded-lg shadow-lg p-6">
        <SummaryForm
          summary={
            summaryStore !== null && summaryStore !== ""
              ? summaryStore
              : summaryData
          }
        ></SummaryForm>
      </div>
    </div>
  );
};

export default Summary;
