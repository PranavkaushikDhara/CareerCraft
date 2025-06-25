import PrimaryButton,{SecondaryButton} from "../../atoms/Button";
import ButtonLink, { ButonLinkSecondary } from "../../atoms/ButtonLink";
import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 px-8 py-12 max-w-7xl mx-auto">
      {/* Left side */}
      <div className="flex flex-col items-start gap-6 flex-1">
        <span className="text-5xl text-CareerCraftWhite font-bold ">
          Transform Your Resume <br />
          <span className="text-CareerCraftPrimary">for Every Opportunity</span>
        </span>
        <p className="text-lg text-CareerCraftText max-w-2xl">
          Customize your resume instantly for any Job Application. Our
          AI-powered platform helps you stand out and land your dream job.
        </p>
        <div className="flex gap-4">
          <ButonLinkSecondary
            text="Build Your Resume Now"
            href="/create-resume"
            class="hover:bg-CareerCraftPrimaryDark bg-CareerCraftPrimary p-2"
          />
          <ButonLinkSecondary
            text="Upload Your Existing Resume"
            href="/create-resume"
            class="hover:bg-CareerCraftPrimaryDark border border-CareerCraftPrimary px-6 py-3"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <video
          className="w-full h-full object-cover rounded-xl shadow-lg"
          loop={true}
          autoPlay={true}
          muted={true}
        >
          <source src="/banner.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Banner;
