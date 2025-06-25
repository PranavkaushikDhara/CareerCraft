"use client";
import Input from "@/components/atoms/Input";
import useResumeStore, { Skill } from "@/store/ResumeStore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FormSubmitButton, SecondaryButton } from "@/components/atoms/Button";

interface SkillProps {
  skills: Skill[];
}

const SkillsForm = (props: SkillProps) => {
  const [skillGroups, setSkillGroups] = useState<Skill[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [editingGroupName, setEditingGroupName] = useState<string | null>(null);
  const [editedGroupName, setEditedGroupName] = useState("");

  const handleAddSkillGroup = () => {
    const trimmedName = newGroupName.trim();

    if (!trimmedName) {
      alert("Please enter a group name");
      return;
    }

    if (skillGroups.some((group) => group.name === trimmedName)) {
      alert("A group with this name already exists");
      return;
    }

    setSkillGroups((prev) => [...prev, { name: trimmedName, skills: [] }]);
    setNewGroupName("");
  };

  const handleSaveSkills = () => {
    const updateSkills = useResumeStore.getState().addSkill;
    updateSkills(skillGroups);
    redirect("/summary");
  };

  const handleAddSkill = (
    groupTitle: string,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const inputElement = event.target as HTMLInputElement;
      const newSkill = inputElement.value.trim();

      if (newSkill) {
        setSkillGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.name === groupTitle
              ? {
                  ...group,
                  skills: group.skills.includes(newSkill)
                    ? group.skills
                    : [...group.skills, newSkill],
                }
              : group
          )
        );
        inputElement.value = "";
      }
    }
  };

  const handleDeleteSkillGroup = (groupTitle: string) => {
    if (skillGroups.length <= 1) {
      alert("You must have at least one skill group!");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete the "${groupTitle}" group?`
      )
    ) {
      setSkillGroups((prevGroups) =>
        prevGroups.filter((group) => group.name !== groupTitle)
      );
    }
  };

  const handleRemoveSkill = (groupTitle: string, skillToRemove: string) => {
    setSkillGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.name === groupTitle
          ? {
              ...group,
              skills: group.skills.filter((skill) => skill !== skillToRemove),
            }
          : group
      )
    );
  };

  const handleEditSkillGroupName = (oldName: string) => {
    if (!editedGroupName.trim()) {
      alert("Group name cannot be empty.");
      return;
    }

    if (
      skillGroups.some(
        (group) =>
          group.name === editedGroupName.trim() && group.name !== oldName
      )
    ) {
      alert("A group with this name already exists.");
      return;
    }

    setSkillGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.name === oldName
          ? { ...group, name: editedGroupName.trim() }
          : group
      )
    );
    setEditingGroupName(null);
    setEditedGroupName("");
  };

  useEffect(() => {
    setSkillGroups(props.skills);
  }, [props.skills]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <form action={handleSaveSkills} className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-CareerCraftWhite">Skills</h1>
          <div className="flex gap-2 items-center">
            <Input
              name="newGroupName"
              required={false}
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter new skill group name..."
              className="px-3 py-2 border rounded-md"
            />
            <SecondaryButton
              text="Add Group"
              type="button"
              icon={<FaPlus />}
              onClickMethod={handleAddSkillGroup}
              className="bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite p-2"
            />
          </div>
        </div>

        <div className="p-4 rounded-lg shadow-lg bg-CareerCraftPrimary/10">
          {skillGroups.map((skillGroup) => (
            <div key={skillGroup.name} className="mb-6">
              <div className="flex justify-between items-center gap-4 mb-3">
                {editingGroupName === skillGroup.name ? (
                  <>
                    <Input
                      name="editedGroupName"
                      placeholder="Enter new group name..."
                      required={true}
                      type="text"
                      value={editedGroupName}
                      onChange={(e) => setEditedGroupName(e.target.value)}
                      className="px-3 py-2 border rounded-md text-sm"
                    />
                    <SecondaryButton
                      text="Save"
                      type="button"
                      onClickMethod={() =>
                        handleEditSkillGroupName(skillGroup.name)
                      }
                      className="bg-green-600 hover:bg-green-800 text-CareerCraftWhite p-2"
                    />
                  </>
                ) : (
                  <h2 className="text-lg font-semibold text-CareerCraftText">
                    {skillGroup.name}
                  </h2>
                )}

                <div className="flex gap-2">
                  <SecondaryButton
                    text=""
                    type="button"
                    icon={<FaEdit />}
                    className="bg-blue-600 hover:bg-blue-800 text-CareerCraftWhite p-2 rounded-md"
                    onClickMethod={() => {
                      setEditingGroupName(skillGroup.name);
                      setEditedGroupName(skillGroup.name);
                    }}
                  />
                  <SecondaryButton
                    text=""
                    type="button"
                    icon={<MdDelete />}
                    className="bg-red-700 hover:bg-CareerCraftDanger text-CareerCraftWhite p-2 rounded-md"
                    onClickMethod={() =>
                      handleDeleteSkillGroup(skillGroup.name)
                    }
                  />
                </div>
              </div>

              {/* Skill Input */}
              <div className="flex items-center gap-4 mb-3">
                <Input
                  required={false}
                  name="skillInput"
                  type="text"
                  placeholder={`Add a skill to ${skillGroup.name}`}
                  onKeyDown={(e) => handleAddSkill(skillGroup.name, e)}
                  className="px-3 py-2 border rounded-md text-sm w-full"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {skillGroup.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-gradient-to-tr from-CareerCraftBackground to-CareerCraftPrimary/20 text-CareerCraftText text-sm border border-blue-300 flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skillGroup.name, skill)}
                      className="ml-1 text-CareerCraftText hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2">
          <FormSubmitButton
            buttonText="Save & Continue"
            // icon={<FaStepForward />}
            pendingText="Saving Skills..."
            className="bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite p-2"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default SkillsForm;
