"use client";

import React from "react";

import CreateResumeForm from "@/components/molecules/forms/CreateResume";

const CreateResume = () => {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-CareerCraftWhite">
          Upload or Paste Your Resume
        </h1>
      </header>
      <div className=" rounded-lg p-6">
        <CreateResumeForm />
      </div>
    </div>
  );
};

export default CreateResume;
