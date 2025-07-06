"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { MakePDF } from "./Resume";
import { ResumeStore } from "@/store/ResumeStore";
import useResumeStore from "@/store/ResumeStore";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "@/app/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

function Preview() {
  const [isClient, setIsClient] = useState(false);
  const [currentUser, setUser] = useState<User | null>(null);

  // Properly use the Zustand store
  const resumeData = useResumeStore();

  useEffect(() => {
    console.log(resumeData);
    setIsClient(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      console.log("Auth state changed:", user);
      console.log("User displayName:", user?.displayName);
      console.log("User email:", user?.email);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const saveDetailsToDatabase = async (resumeData: ResumeStore) => {
    if (!currentUser) {
      console.error("No authenticated user found");
      return;
    }

    console.log("Saving resume data for user:", currentUser.uid);

    try {
      // Use setDoc with user UID as document ID to ensure single document per user
      const resumeDocRef = doc(database, "resumes", currentUser.uid);

      await setDoc(
        resumeDocRef,
        {
          userId: currentUser.uid,
          userEmail: currentUser.email,
          title: `${resumeData.firstname} ${resumeData.lastname} - Resume`,
          template: "default",
          createdAt: new Date(),
          updatedAt: new Date(),
          // All resume sections in one document
          contact: {
            firstname: resumeData.firstname,
            lastname: resumeData.lastname,
            contactDetails: resumeData.contactDetails,
            address: resumeData.address,
          },
          summary: resumeData.summary,
          experience: resumeData.workExperience,
          education: resumeData.educationDetails,
          skills: resumeData.skills,
          projects: resumeData.projects,
          certifications: resumeData.certifications,
        },
        { merge: true }
      ); // merge: true allows updating existing document

      console.log("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

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
            onClick={() => {
              saveDetailsToDatabase(resumeData);
            }}
            fileName="resume.pdf"
            className="w-full md:w-auto px-6 py-3 bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite rounded-lg transition-colors duration-200 text-center font-medium shadow-md"
          >
            Save & Download
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default Preview;
