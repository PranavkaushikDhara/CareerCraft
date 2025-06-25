import { FormSubmitButton } from "@/components/atoms/Button";
import { TextArea } from "@/components/atoms/Input";
import useResumeStore from "@/store/ResumeStore";
import { redirect } from "next/navigation";
import React, {useEffect, useState } from "react";

interface SummaryProps {
  summary: string;
}

const SAMPLE_SUMMARIES = [
  {
    id: 6,
    title: "Java Developer",
    text: "Detail-oriented Java Developer with expertise in designing, building, and maintaining scalable enterprise applications. Skilled in Java frameworks like Spring Boot and Hibernate, delivering robust back-end solutions. Passionate about optimizing code and implementing innovative features to enhance system performance.",
  },
  {
    id: 7,
    title: "Full Stack Developer",
    text: "Versatile Full Stack Developer experienced in creating dynamic web applications with React, Node.js, and MongoDB. Proficient in both front-end and back-end development, ensuring seamless integration and user-friendly experiences. Dedicated to staying updated on emerging technologies to craft cutting-edge solutions.",
  },
  {
    id: 8,
    title: "Data Scientist",
    text: "Innovative Data Scientist with a strong background in statistical analysis, machine learning, and big data processing. Adept at deriving actionable insights from complex datasets to drive business decisions. Enthusiastic about leveraging AI and predictive modeling to solve real-world problems.",
  },
  {
    id: 9,
    title: "Cloud Engineer",
    text: "Cloud Engineer with expertise in deploying and managing scalable cloud infrastructure using AWS, Azure, and Kubernetes. Skilled in optimizing cloud solutions to ensure high availability and cost efficiency. Committed to implementing best practices for cloud security and automation.",
  },
  {
    id: 10,
    title: "DevOps Engineer",
    text: "Proactive DevOps Engineer with a proven ability to streamline CI/CD pipelines and automate deployment processes. Experienced in containerization technologies like Docker and orchestration tools like Kubernetes. Dedicated to fostering collaboration between development and operations teams for efficient software delivery.",
  },
  {
    id: 11,
    title: "UX/UI Designer",
    text: "Creative UX/UI Designer with a passion for crafting intuitive and visually appealing digital experiences. Proficient in design tools like Figma and Adobe XD, with a focus on user-centered design principles. Enthusiastic about translating user needs into impactful designs that enhance engagement.",
  },
  {
    id: 12,
    title: "Cybersecurity Analyst",
    text: "Skilled Cybersecurity Analyst with a strong background in threat detection, vulnerability assessment, and incident response. Proficient in implementing security measures to protect systems from cyber threats. Passionate about safeguarding sensitive data and ensuring compliance with industry standards.",
  },
];

const SummaryForm: React.FC<SummaryProps> = (props: SummaryProps) => {
  const [summaryData, setSummaryData] = useState("");
  useEffect(() => {
    setSummaryData(props.summary);
  }, [props.summary]);

  const handleSubmit = () => {
    console.log("Submitting Summary");
    const updateSummary = useResumeStore.getState().addSummary;
    updateSummary(summaryData);

    redirect("/preview");
  };

  return (
    <div className="flex flex-col gap-6">
      <form action={handleSubmit} className="flex flex-col gap-4">
        <TextArea
          name="summary"
          placeholder="Enter your professional summary..."
          value={summaryData}
          onChange={(e: any) => setSummaryData(e.target.value)}
          required={true}
          className="h-48"
        />
        <div className="flex justify-center">
          <FormSubmitButton
            type="submit"
            buttonText="Create Base Resume"
            pendingText="Hold On..."
            className="bg-CareerCraftPrimary text-CareerCraftWhite p-2 rounded-md hover:bg-CareerCraftPrimaryDark"
          />
        </div>
      </form>

      <div className=" bg-CareerCraftPrimary/10 rounded-lg p-4 flex flex-col gap-4">
        <h3 className="text-CareerCraftWhite text-lg font-semibold ">
          Pre Written Summaries
        </h3>
        <div className="flex flex-col gap-3 h-[300px] overflow-y-auto">
          {SAMPLE_SUMMARIES.map((sample) => (
            <div
              key={sample.id}
              onClick={() => setSummaryData(sample.text)}
              className="p-3 bg-CareerCraftBackground rounded-md cursor-pointer hover:bg-CareerCraftPrimary/20 transition-colors"
            >
              <h4 className="text-CareerCraftPrimary font-medium mb-1">
                {sample.title}
              </h4>
              <p className="text-CareerCraftText text-sm">{sample.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
