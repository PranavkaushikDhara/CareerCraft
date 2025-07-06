"use server";

import { ResumeStore } from "@/store/ResumeStore";
import { RESUME_TAILOR_PROMPT } from "@/utils/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { z } from "zod";

interface TailorState {
  success?: boolean;
  error?: string;
  message?: string;
  data?: any;
}

interface WorkExperience {
  title?: string | null;
  company?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  responsibilities: string[];
}

// Schema for structured output
const tailoredResponseSchema = z.object({
  workExperience: z.array(
    z.object({
      title: z.string().optional().nullable(),
      company: z.string().optional().nullable(),
      startDate: z.string().optional().nullable(),
      endDate: z.string().optional().nullable(),
      city: z.string().optional().nullable(),
      state: z.string().optional().nullable(),
      country: z.string().optional().nullable(),
      responsibilities: z.array(z.string()),
    })
  ),
  skills: z.array(
    z.object({
      name: z.string().optional().nullable(),
      skills: z.array(z.string()),
    })
  ),
});

// Initialize parser
const parser = StructuredOutputParser.fromZodSchema(tailoredResponseSchema);

// Validation functions
function validateJobDescription(jobDescription: string): TailorState | null {
  if (!jobDescription?.trim()) {
    return {
      success: false,
      error: "Please enter a job description",
    };
  }
  return null;
}

function validateResumeData(resumeDataString: string): TailorState | null {
  if (!resumeDataString) {
    return {
      success: false,
      error: "Resume data not found. Please refresh the page and try again.",
    };
  }
  return null;
}

function parseResumeData(resumeDataString: string): ResumeStore | TailorState {
  try {
    return JSON.parse(resumeDataString);
  } catch (error) {
    return {
      success: false,
      error:
        "Invalid resume data format. Please refresh the page and try again.",
    };
  }
}

// LLM processing functions
function createLLMModel(): ChatOpenAI {
  return new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
  });
}

function buildPrompt(jobDescription: string, workExperience: any[]): string {
  const humanMessageTemplate = `### CONTEXT
- Job Description: 
[JOB_DESCRIPTION]

- Current Work Experience: 
[CURRENT_WORK_EXPERIENCE]`;

  return humanMessageTemplate
    .replace("[JOB_DESCRIPTION]", jobDescription)
    .replace(
      "[CURRENT_WORK_EXPERIENCE]",
      JSON.stringify(workExperience, null, 2)
    );
}

function extractJsonFromResponse(response: string): string {
  const startMarker = "```json";
  const endMarker = "```";
  const startIndex = response.indexOf(startMarker);
  const endIndex = response.lastIndexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("No valid JSON code block found in LLM response.");
  }

  return response.substring(startIndex + startMarker.length, endIndex).trim();
}

// Main function
export async function tailorResume(
  prevState: TailorState | null,
  formData: FormData
): Promise<TailorState> {
  try {
    // Extract and validate form data
    const jobDescription = formData.get("jobDescription") as string;
    const resumeDataString = formData.get("resumeData") as string;

    // Validate inputs
    const jobDescriptionError = validateJobDescription(jobDescription);
    if (jobDescriptionError) return jobDescriptionError;

    const resumeDataError = validateResumeData(resumeDataString);
    if (resumeDataError) return resumeDataError;

    // Parse resume data
    const resumeDataResult = parseResumeData(resumeDataString);
    if ("success" in resumeDataResult && !resumeDataResult.success) {
      return resumeDataResult as TailorState;
    }
    const resumeData = resumeDataResult as ResumeStore;

    // Initialize LLM
    const model = createLLMModel();
    const prompt = buildPrompt(jobDescription, resumeData.workExperience);

    // Get LLM response
    const response = await model.invoke([
      new SystemMessage(RESUME_TAILOR_PROMPT + parser.getFormatInstructions()),
      new HumanMessage(prompt),
    ]);

    // Parse response
    const responseContent = response.content.toString();
    const jsonString = extractJsonFromResponse(responseContent);
    const tailoredResponse = await parser.parse(jsonString);
    console.log(tailoredResponse.workExperience);

    return {
      success: true,
      message: "Resume analysis completed successfully!",
      data: tailoredResponse,
    };
  } catch (error) {
    console.error("Error in tailorResume action:", error);
    return {
      success: false,
      error: "Failed to analyze resume. Please try again.",
    };
  }
}
