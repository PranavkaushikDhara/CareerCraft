"use client";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { MakePDF } from "@/app/(resume-builder)/(sections)/preview/Resume";
import useResumeStore from "@/store/ResumeStore";
import { useState, useEffect } from "react";
import { FaWandMagicSparkles, FaDownload } from "react-icons/fa6";
import { tailorResume } from "./action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark disabled:bg-gray-600 text-CareerCraftWhite p-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
    >
      <FaWandMagicSparkles />
      {pending ? "Analyzing..." : "Analyze & Tailor"}
    </button>
  );
}

export default function TailorPage() {
  const [isClient, setIsClient] = useState(false);
  const [state, formAction] = useActionState(tailorResume, null);
  const [showMessage, setShowMessage] = useState(false);
  const [tailoredResumeData, setTailoredResumeData] = useState<any>(null);

  // Use Zustand store properly
  const resumeData = useResumeStore();

  useEffect(() => {
    setIsClient(true);

    // Load tailored resume from localStorage if available
    const savedResumeStorage = localStorage.getItem("resume-storage");
    if (savedResumeStorage) {
      try {
        const parsedData = JSON.parse(savedResumeStorage);
        if (parsedData.state && parsedData.state.tailoredFor) {
          setTailoredResumeData(parsedData.state);
        }
      } catch (error) {
        console.error("Error loading resume from localStorage:", error);
      }
    }
  }, []);

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (state?.success || state?.error) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowMessage(false);
    }
  }, [state]);

  // Save tailored experience to localStorage when successful
  useEffect(() => {
    console.log("State changed:", state);
    if (state?.success && state?.data?.tailoredExperience) {
      console.log("Processing tailored experience:", state.data);
      const tailoredData = {
        ...resumeData,
        workExperience: state.data.tailoredExperience,
        tailoredFor: state.data.jobDescription,
        tailoredAt: new Date().toISOString(),
      };

      console.log("Setting tailored data:", tailoredData);
      setTailoredResumeData(tailoredData);

      // Update the main resume data in localStorage
      localStorage.setItem(
        "resume-storage",
        JSON.stringify({
          state: tailoredData,
          version: 1,
        })
      );
    }
  }, [state, resumeData]);

  // Use tailored data if available, otherwise use original data
  const displayResumeData = tailoredResumeData || resumeData;

  // Debug logging
  console.log("Tailored Resume Data:", tailoredResumeData);
  console.log("Display Resume Data:", displayResumeData);

  return (
    <div className="bg-CareerCraftBackground min-h-screen">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-CareerCraftWhite mb-2">
            Resume Tailor
          </h1>
          <p className="text-CareerCraftText">
            Paste a job description to analyze and tailor your resume for the
            position.
          </p>
        </div>

        {/* Error and Success Messages */}
        {state?.error && showMessage && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] p-4 bg-red-500/90 border border-red-500 rounded-lg text-white shadow-lg transition-all duration-300 max-w-md">
            {state.error}
          </div>
        )}
        {state?.success && showMessage && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] p-4 bg-green-500/90 border border-green-500 rounded-lg text-white shadow-lg transition-all duration-300 max-w-md">
            {state.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Job Description Form */}
          <div className="bg-CareerCraftPrimary/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-CareerCraftWhite mb-4">
              Job Description
            </h2>
            <form action={formAction} className="space-y-4">
              <textarea
                name="jobDescription"
                required
                className="w-full h-96 p-4 bg-CareerCraftBackground text-CareerCraftText border border-CareerCraftPrimary/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-CareerCraftPrimary"
                placeholder="Paste the job description here..."
              />
              <input
                type="hidden"
                name="resumeData"
                value={JSON.stringify(resumeData)}
              />
              <div className="flex justify-center">
                <SubmitButton />
              </div>
            </form>
          </div>

          {/* Right Side - Resume Preview */}
          <div className="bg-CareerCraftPrimary/10 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-CareerCraftWhite">
                Resume Preview
              </h3>
              {isClient && tailoredResumeData && (
                <PDFDownloadLink
                  document={<MakePDF resumeStore={displayResumeData} />}
                  fileName={`tailored-resume-${new Date().toISOString().split("T")[0]}.pdf`}
                  className="bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                >
                  <FaDownload />
                  Download PDF
                </PDFDownloadLink>
              )}
            </div>
            {!isClient ? (
              <div className="h-[calc(100vh-12rem)] flex items-center justify-center bg-CareerCraftBackground rounded-lg">
                <div className="text-CareerCraftText">
                  Loading resume preview...
                </div>
              </div>
            ) : (
              <div className="h-[calc(100vh-12rem)]">
                <PDFViewer showToolbar={false} width="100%" height="100%">
                  <MakePDF resumeStore={displayResumeData} />
                </PDFViewer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
