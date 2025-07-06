"use client";

import React, { useEffect, useState } from "react";
import ExperienceForm from "@/components/molecules/forms/ExperienceForm";
import { Work } from "@/store/ResumeStore";
import { getDoc, doc } from "firebase/firestore"; // Implement this in the future
import useResumeStore from "@/store/ResumeStore";

const Experience = () => {
  const [experienceData, setExperienceData] = useState<Work[]>([]);
  const workExperience = useResumeStore.getState().workExperience; // TODO: Implement this in the future. Get from database and use local storage as fallback

  useEffect(() => {
    const resumeData = localStorage.getItem("resumeData");
    if (resumeData) {
      try {
        const parsedData = JSON.parse(resumeData).workExperience || [];
        setExperienceData(parsedData); // Update state to trigger re-render
      } catch (error) {
        console.error("Error parsing resume data from localStorage:", error);
      }
    }
  }, []);

  const experienceToRender =
    workExperience.length >= 1 ? workExperience : experienceData;
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-8">
      <div className="flex w-full justify-between items-center">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-CareerCraftWhite">
            Experience
          </h1>
          <p className="text-base text-CareerCraftText">
            Let's start with your most recent job.
          </p>
        </header>
      </div>
      <div className=" rounded-lg ">
        <ExperienceForm experience={experienceToRender} />
      </div>
    </div>
  );
};

export default Experience;
