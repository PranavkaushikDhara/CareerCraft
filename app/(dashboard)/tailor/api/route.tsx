"use server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resumeData, jobDescription } = await req.json();

    if (!resumeData || !jobDescription) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Here you can process the data, send it to an AI model, store it in DB, etc.
    console.log("Received resume data:", resumeData);
    console.log("Received job description:", jobDescription);

    return NextResponse.json(
      {
        message: "Data received successfully",
        data: { resumeData, jobDescription },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
