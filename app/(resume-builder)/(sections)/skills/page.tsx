"use client";
import SkillsForm from "@/components/molecules/forms/SkillsForm";
import useResumeStore, { Skill } from "@/store/ResumeStore";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skillGroups, setSkillGroups] = useState<Skill[]>([]);
  useEffect(() => {
    const resumeData = localStorage.getItem("resumeData");
    if (resumeData) {
      try {
        const parsedData = JSON.parse(resumeData).skills || [];
        setSkillGroups(parsedData);
      } catch (error) {
        console.error("Error parsing resume data from localStorage:", error);
      }
    }
  }, []);
  const skillsStore = useResumeStore.getState().skills;
  const skillsToRender = skillsStore.length >= 1 ? skillsStore : skillGroups;
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-CareerCraftWhite">Skills</h1>
        <p className="text-base text-CareerCraftText">
          Add your technical and soft skills to showcase your capabilities to
          potential employers.
        </p>
      </header>

      <div className="flex flex-col gap-4 w-full mx-auto">
        <SkillsForm skills={skillsToRender} />
      </div>
    </div>
  );
};

export default Skills;
