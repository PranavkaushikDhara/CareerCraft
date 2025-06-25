"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { MakePDF } from "./Resume";
import { ResumeStore } from "@/store/ResumeStore";
import useResumeStore from "@/store/ResumeStore";

function Preview() {
  const [isClient, setIsClient] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeStore>(useResumeStore());

  useEffect(() => {
    setIsClient(true);
    const resumeStore = localStorage.getItem("resume-storage");
    if (resumeStore) {
      setResumeData(JSON.parse(resumeStore).state);
    }
  }, []);

  return (
    <div className=" p-4 md:p-8">
      {isClient && (
        <div className="flex flex-col gap-6 items-center max-w-3xl mx-auto">
          <div className="w-full h-[calc(100vh-12rem)] border rounded-lg shadow-lg overflow-hidden">
            <PDFViewer showToolbar={false} width="100%" height="100%">
              <MakePDF resumeStore={resumeData} />
            </PDFViewer>
          </div>

          <PDFDownloadLink
            document={<MakePDF resumeStore={resumeData} />}
            fileName="resume.pdf"
            className="w-full md:w-auto px-6 py-3 bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite rounded-lg transition-colors duration-200 text-center font-medium shadow-md"
          >
            {/* {({ loading }) => 
              loading ? "Generating PDF..." : "Download Resume"
            } */}
            Download Resume
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default Preview;
