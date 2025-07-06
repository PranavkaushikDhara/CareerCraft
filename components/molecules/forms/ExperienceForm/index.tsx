"use client";
import Input from "@/components/atoms/Input";
import clsx from "clsx";
import React, { use, useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import useResumeStore, { Work } from "@/store/ResumeStore";
import { FormSubmitButton, SecondaryButton } from "@/components/atoms/Button";
import { redirect } from "next/navigation";
import { MdDelete } from "react-icons/md";
interface ExperienceProps {
  experience: Work[];
}

const ExperienceForm = (props: ExperienceProps) => {
  console.log(props.experience);
  // States for managing the form
  const [experiences, setExperiences] = useState<Work[]>([]);
  const [openStates, setOpenStates] = useState<boolean[]>([]);
  const [experienceIds, setExperienceIds] = useState<string[]>([]);
  const [currentJobs, setCurrentJobs] = useState<boolean[]>([]);

  useEffect(() => {
    setExperiences(
      props.experience?.map(exp => ({
        ...exp,
        taskIds: exp.responsibilities?.map(() => crypto.randomUUID()),
      }))
    );
    setOpenStates(new Array(props.experience.length).fill(false));
    setCurrentJobs(props.experience.map(exp => exp.currentJob || false));
    setExperienceIds(props.experience.map(() => crypto.randomUUID()));
  }, [props.experience]);

  // Handle adding a responsibility
  const addResponsibility = (experienceIndex: number) => {
    const allResponsibilities = [
      ...experiences[experienceIndex].responsibilities,
      "",
    ];
    const allResponsibilityIds =
      experiences[experienceIndex].responsibilityIds != null
        ? [...experiences[experienceIndex].responsibilityIds, ""]
        : [""];
    setExperiences(prevExperiences => {
      return prevExperiences.map((exp, index) => {
        if (index === experienceIndex) {
          return {
            ...exp,
            responsibilities: allResponsibilities,
            responsibilityIds: allResponsibilityIds,
          };
        }
        return exp;
      });
    });
  };

  // Handle changing the value of a responsibility
  const handleResponsibilityChange = (
    experienceIndex: number,
    responsibilityIndex: number,
    value: string
  ) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[experienceIndex].responsibilities[responsibilityIndex] =
      value;
    setExperiences(updatedExperiences);
  };

  // Handle deleting a responsibility
  const deleteResponsibility = (
    experienceIndex: number,
    responsibilityIndex: number
  ) => {
    setExperiences(prevExperiences => {
      return prevExperiences.map((exp, index) => {
        if (index === experienceIndex) {
          return {
            ...exp,
            responsibilities: exp.responsibilities.filter(
              (_, taskIndex) => taskIndex !== responsibilityIndex
            ),
            responsibilityIds: exp.responsibilityIds.filter(
              (_, taskIndex) => taskIndex !== responsibilityIndex
            ),
          };
        }
        return exp;
      });
    });
  };

  // Handle adding an experience
  const addExperience = () => {
    setExperiences(prev => [
      ...prev,
      {
        title: "",
        company: "",
        city: "",
        state: "",
        country: "",
        startDate: "",
        endDate: "",
        responsibilities: [],
        responsibilityIds: [],
        currentJob: false,
      },
    ]);
    setOpenStates(prev => [...prev, true]);
    setCurrentJobs(prev => [...prev, false]);
    setExperienceIds(prev => [...prev, crypto.randomUUID()]);
  };

  // Handle changing the value of an experience field
  const handleExperienceChange = (
    experienceIndex: number,
    field: string,
    value: string
  ) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[experienceIndex] = {
      ...updatedExperiences[experienceIndex],
      [field]: value,
    };
    setExperiences(updatedExperiences);
  };

  // Handle deleting an experience
  const deleteExperience = (index: number) => {
    setExperiences(prevExperiences => {
      const newExperiences = prevExperiences.filter((_, i) => i !== index);
      return newExperiences;
    });

    setOpenStates(prevOpenStates => {
      const newOpenStates = prevOpenStates.filter((_, i) => i !== index);
      return newOpenStates;
    });

    setExperienceIds(prev => prev.filter((_, i) => i !== index));
  };

  // Handle toggling the open state of an experience
  const toggleOpen = (index: number) => {
    const updatedOpenStates = [...openStates];
    updatedOpenStates[index] = !updatedOpenStates[index];
    setOpenStates(updatedOpenStates);
  };

  // Update handleCurrentJobToggle function
  const handleCurrentJobToggle = (experienceIndex: number) => {
    setCurrentJobs(prev => {
      const updated = [...prev];
      updated[experienceIndex] = !updated[experienceIndex];

      // Update experiences when toggling current job
      setExperiences(prevExperiences =>
        prevExperiences.map((exp, index) =>
          index === experienceIndex
            ? {
                ...exp,
                currentJob: updated[experienceIndex],
                endDate: updated[experienceIndex] ? "" : exp.endDate,
              }
            : exp
        )
      );

      return updated;
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    const updateExperience = useResumeStore.getState().addWorkExperience;
    updateExperience(experiences);
    console.log("Experience data saved:", experiences);
    redirect("/education");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full justify-end items-center">
        <SecondaryButton
          text="Add Experience"
          className="bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite p-2"
          icon={<FaPlus />}
          onClickMethod={addExperience}
        />
      </div>
      {experiences.length === 0 ? (
        <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg w-full">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-CareerCraftWhite text-sm">
              You have not added any work experience yet
            </span>
          </div>
        </div>
      ) : (
        <form action={handleSubmit} className="flex flex-col gap-4 w-full">
          {experiences.map((experience, experienceIndex) => {
            return (
              <div
                className="flex flex-col gap-4 bg-CareerCraftPrimary/10 p-4 rounded-lg shadow-lg w-full"
                key={experienceIds[experienceIndex]}
              >
                <div
                  className="flex justify-between gap-2 items-center cursor-pointer w-full"
                  onClick={() => toggleOpen(experienceIndex)}
                >
                  <div className="flex items-center justify-between flex-1">
                    <p className="text-CareerCraftText text-sm">
                      {experience.title} - {experience.company}
                    </p>
                    {openStates[experienceIndex] ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )}
                  </div>

                  <div
                    className="flex gap-2 items-center"
                    onClick={e => e.stopPropagation()}
                  >
                    <SecondaryButton
                      text=""
                      type="button"
                      icon={<MdDelete />}
                      className="bg-red-700 hover:bg-CareerCraftDanger text-CareerCraftWhite p-2 rounded-md"
                      onClickMethod={() => deleteExperience(experienceIndex)}
                    />
                  </div>
                </div>

                <div
                  className={clsx("flex flex-col gap-4", {
                    hidden: !openStates[experienceIndex],
                  })}
                >
                  {/* Job Title and Company */}
                  <div className="flex gap-4 w-full flex-wrap">
                    <div className="flex flex-col gap-2 flex-1">
                      <label
                        className="text-CareerCraftWhite text-sm font-medium"
                        htmlFor="title"
                      >
                        Job Title
                      </label>
                      <Input
                        required={true}
                        className="rounded-md"
                        placeholder="Job Title"
                        value={experience.title}
                        name="title"
                        onChange={e =>
                          handleExperienceChange(
                            experienceIndex,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label
                        className="text-CareerCraftWhite text-sm font-medium"
                        htmlFor="company"
                      >
                        Company
                      </label>
                      <Input
                        required={true}
                        className="rounded-md"
                        placeholder="Company or Organization Name"
                        value={experience.company}
                        name="company"
                        onChange={e =>
                          handleExperienceChange(
                            experienceIndex,
                            "company",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Location Fields */}
                  <div className="md:flex-row flex flex-col gap-4 w-full flex-wrap">
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
                        value={experience.city}
                        name="city"
                        onChange={e =>
                          handleExperienceChange(
                            experienceIndex,
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
                        value={experience.state}
                        name="state"
                        onChange={e =>
                          handleExperienceChange(
                            experienceIndex,
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
                        value={experience.country}
                        placeholder="Country"
                        name="country"
                        className="rounded-md"
                        onChange={e =>
                          handleExperienceChange(
                            experienceIndex,
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
                        required={true}
                        placeholder="Start Date"
                        name="startDate"
                        type="date"
                        value={
                          experience.startDate &&
                          !isNaN(Date.parse(experience.startDate))
                            ? new Date(experience.startDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        className="rounded-md"
                        onChange={e =>
                          handleExperienceChange(
                            experienceIndex,
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
                        required={!currentJobs[experienceIndex]}
                        disabled={currentJobs[experienceIndex]}
                        placeholder="End Date"
                        name="endDate"
                        type="date"
                        className={clsx("rounded-md", {
                          "opacity-50": currentJobs[experienceIndex],
                        })}
                        value={
                          experience.endDate &&
                          !isNaN(Date.parse(experience.endDate))
                            ? new Date(experience.endDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={e =>
                          handleExperienceChange(
                            experienceIndex,
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
                      name="isCurrentJob"
                      checked={currentJobs[experienceIndex]}
                      onChange={() => handleCurrentJobToggle(experienceIndex)}
                    />
                    <span>I currently work here</span>
                  </span>

                  <div className="flex flex-col gap-4 w-full">
                    <label className="text-CareerCraftWhite text-sm font-medium">
                      Responsibilities
                    </label>
                    {experience.responsibilities?.map(
                      (responsibility, responsibilityIndex) => (
                        <div
                          key={
                            experience.responsibilityIds?.[
                              responsibilityIndex
                            ] ||
                            `${experienceIds[experienceIndex]}-task-${responsibilityIndex}`
                          }
                          className="flex items-center gap-2"
                        >
                          <Input
                            name={`responsibility${responsibilityIndex}`}
                            required={false}
                            className="rounded-md w-full"
                            placeholder={`Responsibility ${
                              responsibilityIndex + 1
                            }`}
                            value={responsibility}
                            onChange={e =>
                              handleResponsibilityChange(
                                experienceIndex,
                                responsibilityIndex,
                                e.target.value
                              )
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              deleteResponsibility(
                                experienceIndex,
                                responsibilityIndex
                              )
                            }
                            className="flex items-center gap-2 bg-CareerCraftDanger hover:bg-red-700 text-CareerCraftWhite p-2 rounded-md text-sm w-auto"
                          >
                            Delete
                          </button>
                        </div>
                      )
                    )}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => addResponsibility(experienceIndex)}
                        className="flex items-center gap-2 bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-white py-2 px-2 rounded-md text-sm w-auto"
                      >
                        <FaPlus />
                        Add Responsibility
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-2">
            <FormSubmitButton
              buttonText="Save & Continue"
              // icon={<FaStepForward />}
              pendingText="Saving Experience..."
              className="bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite p-2"
              type="submit"
            ></FormSubmitButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExperienceForm;
