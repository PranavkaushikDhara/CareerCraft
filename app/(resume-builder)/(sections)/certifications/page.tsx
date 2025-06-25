"use client";

import React, { useEffect, useState } from "react";

import CertificationForm from "@/components/molecules/forms/CertificateForm";
import useResumeStore, { Certification } from "@/store/ResumeStore";
const CertificationPage = () => {
  const [certificationData, setCertificationData] = useState<Certification[]>(
    []
  );

  const certificateStore = useResumeStore.getState().certifications;
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const resumeData = localStorage.getItem("resumeData");
    if (resumeData) {
      try {
        const parsedData = JSON.parse(resumeData).certifications || [];
        setCertificationData(parsedData); // Update state to trigger re-render
      } catch (error) {
        console.error("Error parsing resume data from localStorage:", error);
      }
    }
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-CareerCraftWhite">
          Certifications
        </h1>
        <p className="text-base text-CareerCraftText">
          Add your certifications and achievements.
        </p>
      </header>
      <div className=" rounded-lg ">
        <CertificationForm
          certifications={
            certificateStore.length >= 1 ? certificateStore : certificationData
          }
        />
      </div>
    </div>
  );
};

export default CertificationPage;
