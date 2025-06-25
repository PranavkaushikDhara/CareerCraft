import Card from "../../atoms/Card";
import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { HiSpeakerphone } from "react-icons/hi";
import { GoListOrdered } from "react-icons/go";
const Features = () => {
  return (
    <div className="flex flex-col px-8 py-12">
      <div className="flex flex-col gap-4  max-w-7xl mx-auto w-full">
        <h2 className="text-5xl font-bold text-CareerCraftWhite text-center">
          Everything you want to create a perfect application
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              icon: <IoDocumentTextOutline className="text-2xl" />,
              title: "Resume Customization",
              text: "Tailor your resume automatically for each job application",
            },
            {
              icon: <IoDocumentTextOutline className="text-2xl" />,
              title: "Linkedin Optimization",
              text: "Enhance your profile to attract recruiters",
            },
            {
              icon: <IoMdMail className="text-2xl" />,
              title: "Email Writer",
              text: "Generate Professional emails for job applications",
            },
            {
              icon: <HiSpeakerphone className="text-2xl" />,
              title: "Pitch Generator",
              text: "Create compelling elevator pitches instantly",
            },
            {
              icon: <GoListOrdered className="text-2xl" />,
              title: "Job Tracking",
              text: "Track your job applications and interviews",
            },
          ].map((card) => (
            <div
              className="flex-1 min-w-[280px] max-w-[320px]"
              key={card.title}
            >
              <Card icon={card.icon} title={card.title} text={card.text} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
