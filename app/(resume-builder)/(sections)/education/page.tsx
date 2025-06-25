"use client";

import React, { useEffect, useState } from "react";
import EducationForm from "@/components/molecules/forms/EducationForm";
import useResumeStore, { Education } from "@/store/ResumeStore";

const EducationPage = () => {
  const [educationData, setEducationData] = useState<Education[]>([]);
  const educationDetails = useResumeStore.getState().educationDetails;

  useEffect(() => {
    const resumeData = localStorage.getItem("resumeData");
    if (resumeData) {
      try {
        const parsedData = JSON.parse(resumeData).educationDetails || [];
        setEducationData(parsedData);
      } catch (error) {
        console.error("Error parsing resume data from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-8">
      <div className="flex w-full justify-between items-center">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-CareerCraftWhite ">
            Education
          </h1>
          <p className="text-base text-CareerCraftText">
            Add your educational background to help employers understand your
            qualifications.
          </p>
        </header>
      </div>
      <div className=" rounded-lg ">
        {" "}
        <EducationForm
          education={
            educationDetails.length >= 1 ? educationDetails : educationData
          }
        />
      </div>
    </div>
  );
};

export default EducationPage;
