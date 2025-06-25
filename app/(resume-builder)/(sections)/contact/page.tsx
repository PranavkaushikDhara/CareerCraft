"use client";
import ContactForm from "@/components/molecules/forms/ContactForm";
import useResumeStore, {
  ContactDetails,
} from "@/store/ResumeStore";
import React, { useEffect, useState } from "react";

const Contact: React.FC = () => {
  const [resumeData, setResumeData] = useState<any>(null);
  const contactDetails: ContactDetails =
    useResumeStore.getState().contactDetails;

  useEffect(() => {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      try {
        setResumeData(JSON.parse(storedData));
      } catch (error) {
        console.error(
          "Failed to parse resume data from sessionStorage:",
          error
        );
        localStorage.removeItem("resumeData");
      }
    } else {
      setResumeData(useResumeStore.getState());
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-CareerCraftWhite">Contact</h1>
        <p className="text-base text-CareerCraftText">
          Make sure employers can reach you by including your name, email, and
          phone number.
        </p>
      </header>

      <div className="flex flex-col gap-4 w-full mx-auto ">
        <ContactForm
          resumeData={
            contactDetails.email !== "" ? useResumeStore.getState() : resumeData
          }
        />
      </div>
    </div>
  );
};

export default Contact;
