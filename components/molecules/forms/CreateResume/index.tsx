"use client";
import prepareFields from "@/app/(resume-builder)/create-resume/action";
import { FormSubmitButton } from "@/components/atoms/Button";
import { TextArea } from "@/components/atoms/Input";
import Form from "next/form";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

const CreateResumeForm: React.FC = () => {
  const [state, formAction] = useActionState(prepareFields, undefined);
  const router = useRouter();
  const { pending } = useFormStatus();
  useEffect(() => {
    if (state && !pending) {
      localStorage.clear();
      localStorage.setItem("resumeData", JSON.stringify(state));
      router.push("/contact");
    }
  }, [state, pending, router]);

  return (
    <div className="flex flex-col gap-4 bg-gradient-to-tl from-CareerCraftBackground to-CareerCraftPrimary/40 bg-CareerCraftBackground p-4 rounded-lg shadow-lg w-full">
      <Form
        action={formAction}
        className="flex flex-col items-center gap-4 w-full"
      >
        <TextArea
          required={true}
          className="w-full h-40"
          name="resume"
          placeholder="Please paste your resume content here."
        />

        <div className="text-sm font-medium text-CareerCraftText">or</div>

        <input
          type="file"
          className="w-full max-w-lg p-2 border rounded-md shadow-sm  focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          placeholder="Please Upload your resume here"
        />

        <FormSubmitButton
          className="bg-CareerCraftPrimary text-CareerCraftWhite p-2 rounded-md hover:bg-CareerCraftPrimaryDark"
          type="submit"
          buttonText="Create a new base resume"
          pendingText="Creating..."
        ></FormSubmitButton>
      </Form>
    </div>
  );
};

export default CreateResumeForm;
