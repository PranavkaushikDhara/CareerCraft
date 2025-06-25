import React, { useEffect, useState } from "react";
import Input from "@/components/atoms/Input";
import { FormSubmitButton, SecondaryButton } from "@/components/atoms/Button";
import { redirect } from "next/navigation";
import { FaAngleDown, FaAngleUp, FaStepForward } from "react-icons/fa";
import { FaBackwardStep, FaPlus } from "react-icons/fa6";
import clsx from "clsx";
import useResumeStore from "@/store/ResumeStore";
import { Education } from "@/store/ResumeStore";
import { MdDelete } from "react-icons/md";

interface EducationProps {
  education: Education[];
}

const EducationForm = (props: EducationProps) => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [openStates, setOpenStates] = useState<boolean[]>([]);
  const [educationIds, setEducationIds] = useState<string[]>([]);
  const [currentEducations, setCurrentEducations] = useState<boolean[]>([]);

  useEffect(() => {
    setEducations(props.education || []);
    setOpenStates(new Array(props.education.length).fill(false));
    setEducationIds(props.education.map(() => crypto.randomUUID()));
    setCurrentEducations(
      props.education.map((edu) => edu.currentEducation || false)
    );
  }, [props.education]);

  const handleEducationChange = (
    educationIndex: number,
    field: string,
    value: string
  ) => {
    setEducations((prev) =>
      prev.map((edu, index) =>
        index === educationIndex ? { ...edu, [field]: value } : edu
      )
    );
  };

  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        college: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        city: "",
        state: "",
        country: "",
      },
    ]);
    setOpenStates((prev) => [...prev, true]);
    setEducationIds((prev) => [...prev, crypto.randomUUID()]);
  };

  const deleteEducation = (index: number) => {
    setEducations((prev) => {
      const newEducations = prev.filter((_, i) => i !== index);
      return newEducations;
    });
    setOpenStates((prev) => {
      const newOpenStates = prev.filter((_, i) => i !== index);
      return newOpenStates;
    });
    setEducationIds((prev) => {
      const newIds = prev.filter((_, i) => i !== index);
      return newIds;
    });
    setCurrentEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleOpen = (index: number) => {
    setOpenStates((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleSubmit = () => {
    const updateEducation = useResumeStore.getState().addEducation;
    updateEducation(educations);
    redirect("/certifications");
  };

  const handleCurrentEducationToggle = (educationIndex: number) => {
    setCurrentEducations((prev) => {
      const updated = [...prev];
      updated[educationIndex] = !updated[educationIndex];

      setEducations((prevEducations) =>
        prevEducations.map((edu, index) =>
          index === educationIndex
            ? {
                ...edu,
                currentEducation: updated[educationIndex],
                endDate: updated[educationIndex] ? "" : edu.endDate,
              }
            : edu
        )
      );

      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full justify-end items-center">
        <SecondaryButton
          text="Add Education"
          className="bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite p-2"
          icon={<FaPlus />}
          onClickMethod={addEducation}
        />
      </div>
      {educations.length === 0 ? (
        <div className="flex flex-col gap-4 bg-CareerCraftPrimary/10 p-4 rounded-lg shadow-lg w-full">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-CareerCraftWhite text-sm">
              You have not added any education yet
            </span>
          </div>
        </div>
      ) : (
        <form action={handleSubmit} className="flex flex-col gap-4 w-full">
          {educations.map((education, educationIndex) => (
            <div
              key={educationIds[educationIndex]}
              className="flex flex-col gap-4 bg-CareerCraftPrimary/10 p-4 rounded-lg shadow-lg w-full"
            >
              <div
                className="flex justify-between gap-2 items-center cursor-pointer w-full"
                onClick={() => toggleOpen(educationIndex)}
              >
                <div className="flex items-center justify-between flex-1">
                  <p className="text-CareerCraftText text-sm">
                  {education.degree} - {education.college}
                  </p>
                  {openStates[educationIndex] ? <FaAngleUp /> : <FaAngleDown />}
                </div>

                <div
                  className="flex gap-2 items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SecondaryButton
                    text=""
                    type="button"
                    icon={<MdDelete />}
                    className="bg-red-700 hover:bg-CareerCraftDanger text-CareerCraftWhite p-2 rounded-md"
                    onClickMethod={() => deleteEducation(educationIndex)}
                  />
                </div>
              </div>
              {/* Education form fields here */}
              <div
                className={clsx("flex flex-col gap-4", {
                  hidden: !openStates[educationIndex],
                })}
              >
                {/* College name */}
                <div className="flex gap-4 flex-wrap w-full">
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      className="text-CareerCraftWhite text-sm font-medium"
                      htmlFor="college"
                    >
                      College or University
                    </label>
                    <Input
                      required
                      className="rounded-md"
                      placeholder="College or University Name"
                      value={education.college}
                      name="college"
                      onChange={(e) =>
                        handleEducationChange(
                          educationIndex,
                          "college",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      className="text-CareerCraftWhite text-sm font-medium"
                      htmlFor="degree"
                    >
                      Degree
                    </label>
                    <Input
                      required
                      className="rounded-md"
                      placeholder="Degree"
                      value={education.degree}
                      name="degree"
                      onChange={(e) =>
                        handleEducationChange(
                          educationIndex,
                          "degree",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="md:flex-row flex flex-col gap-4 w-full flex-wrap">
                  <div className="flex flex-col gap-2 w-full flex-1">
                    <label
                      className="text-CareerCraftWhite text-sm font-medium"
                      htmlFor="fieldOfStudy"
                    >
                      Field of Study
                    </label>
                    <Input
                      required={false}
                      className="rounded-md"
                      placeholder="Field of Study"
                      value={education.fieldOfStudy}
                      name="fieldOfStudy"
                      onChange={(e) =>
                        handleEducationChange(
                          educationIndex,
                          "fieldOfStudy",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      className="text-CareerCraftWhite text-sm font-medium"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <Input
                      required={true}
                      className="rounded-md"
                      placeholder="City"
                      value={education.city}
                      name="city"
                      onChange={(e) =>
                        handleEducationChange(
                          educationIndex,
                          "city",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      className="text-CareerCraftWhite text-sm font-medium"
                      htmlFor="state"
                    >
                      State
                    </label>
                    <Input
                      required={false}
                      className="rounded-md"
                      placeholder="State/Province"
                      value={education.state}
                      name="state"
                      onChange={(e) =>
                        handleEducationChange(
                          educationIndex,
                          "state",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      className="text-CareerCraftWhite text-sm font-medium"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <Input
                      required={true}
                      value={education.country}
                      placeholder="Country"
                      name="country"
                      className="rounded-md"
                      onChange={(e) =>
                        handleEducationChange(
                          educationIndex,
                          "country",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {/* Start and End Date */}
                <div className="flex gap-4 w-full flex-wrap">
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      className="text-CareerCraftWhite text-sm font-medium"
                      htmlFor="startDate"
                    >
                      Start Date
                    </label>
                    <Input
                      required
                      placeholder="Start Date"
                      name="startDate"
                      type="date"
                      value={
                        education.startDate &&
                        !isNaN(Date.parse(education.startDate))
                          ? new Date(education.startDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      className="rounded-md"
                      onChange={(e) =>
                        handleEducationChange(
                          educationIndex,
                          "startDate",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      className="text-CareerCraftWhite text-sm font-medium"
                      htmlFor="endDate"
                    >
                      End Date
                    </label>

                    <Input
                      required={!currentEducations[educationIndex]}
                      disabled={currentEducations[educationIndex]}
                      placeholder="End Date"
                      name="endDate"
                      type="date"
                      className={clsx("rounded-md", {
                        "opacity-50": currentEducations[educationIndex],
                      })}
                      value={
                        education.endDate &&
                        !isNaN(Date.parse(education.endDate))
                          ? new Date(education.endDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleEducationChange(
                          educationIndex,
                          "endDate",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <span className="flex gap-2 text-sm text-CareerCraftText items-center">
                  <input
                    type="checkbox"
                    name="isCurrentEducation"
                    checked={currentEducations[educationIndex]}
                    onChange={() =>
                      handleCurrentEducationToggle(educationIndex)
                    }
                  />
                  <span>I currently study here</span>
                </span>
              </div>
            </div>
          ))}

          <div className="flex justify-center items-center gap-2">
            <FormSubmitButton
              buttonText="Save & Continue"
              // icon={<FaStepForward />}
              pendingText="Saving Education..."
              className="bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite p-2"
              type="submit"
            ></FormSubmitButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default EducationForm;
