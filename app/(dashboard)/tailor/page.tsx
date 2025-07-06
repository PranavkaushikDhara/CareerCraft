"use client";
import { PDFViewer } from "@react-pdf/renderer";
import { MakePDF } from "@/app/(resume-builder)/(sections)/preview/Resume";
import useResumeStore from "@/store/ResumeStore";
import { FormSubmitButton } from "@/components/atoms/Button";
import { useState, useEffect } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
// import { tailorResume } from "./action";
import { useFormStatus } from "react-dom";
export default function TailorPage() {
  const [isClient, setIsClient] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeData, setResumeData] = useState(useResumeStore());
  // const [state, formAction] = useActionState(tailorResume, undefined);

  const { pending } = useFormStatus();

  useEffect(() => {
    setIsClient(true);
    const resumeStore = localStorage.getItem("resume-storage");
    if (resumeStore) {
      setResumeData(JSON.parse(resumeStore).state);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/tailor/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeData, jobDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const data = await response.json();
      console.log("Response from API:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className=" bg-CareerCraftBackground">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Job Description Form */}
          <div className="bg-CareerCraftPrimary/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-CareerCraftWhite mb-4">
              Tailor Your Resume
            </h2>
            <textarea
              value={jobDescription}
              onChange={(e) => {
                e.preventDefault();
                setJobDescription(e.target.value);
              }}
              className="w-full h-96 p-4 bg-CareerCraftBackground text-CareerCraftText border border-CareerCraftPrimary/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-CareerCraftPrimary"
              placeholder="Paste the job description here..."
            />
            <div className="flex justify-center">
              <FormSubmitButton
                buttonText="Analyze & Tailor"
                icon={<FaWandMagicSparkles />}
                onClick={handleSubmit}
                pendingText="Analyzing..."
                className="mt-4 w-full bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite p-3 rounded-lg"
                type="submit"
              />
            </div>
          </div>

          {/* Right Side - Resume Preview */}
          <div className="bg-CareerCraftPrimary/10 p-6 rounded-lg shadow-lg">
            {isClient && (
              <div className="h-[calc(100vh-12rem)]">
                <PDFViewer showToolbar={false} width="100%" height="100%">
                  <MakePDF resumeStore={resumeData} />
                </PDFViewer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
