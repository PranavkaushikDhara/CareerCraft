import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa";
import useResumeStore, { Certification } from "@/store/ResumeStore";
import { FormSubmitButton, SecondaryButton } from "@/components/atoms/Button";
import { redirect } from "next/navigation";
import { MdDelete } from "react-icons/md";

interface CertificationProps {
  certifications: Certification[];
}

const CertificationForm: React.FC<CertificationProps> = ({
  certifications: initialCertifications,
}) => {
  const [certifications, setCertifications] = useState<Certification[]>(
    initialCertifications || []
  );
  const [openStates, setOpenStates] = useState<boolean[]>(
    new Array(initialCertifications?.length || 0).fill(false)
  );
  const [certificationIds, setCertificationIds] = useState<string[]>(
    (initialCertifications || []).map(() => crypto.randomUUID())
  );

  const [noExpiryStates, setNoExpiryStates] = useState<boolean[]>(
    new Array(initialCertifications?.length || 0).fill(
      initialCertifications.forEach((cert) => cert.noExpiry || false)
    )
  );

  const addCertification = () => {
    setCertifications((prev) => [
      ...prev,
      {
        title: "",
        authority: "",
        validFrom: "",
        validTill: "",
        licenseNumber: "",
        noExpiry: false,
      },
    ]);
    setOpenStates((prev) => [...prev, true]);
    setNoExpiryStates((prev) => [...prev, false]);
    setCertificationIds((prev) => [...prev, crypto.randomUUID()]);
  };

  const deleteCertification = (index: number) => {
    setCertifications((prev) => prev.filter((_, i) => i !== index));
    setOpenStates((prev) => prev.filter((_, i) => i !== index));
    setNoExpiryStates((prev) => prev.filter((_, i) => i !== index));
    setCertificationIds((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleOpen = (index: number) => {
    setOpenStates((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleNoExpiryToggle = (index: number) => {
    setCertifications((prevCerts) =>
      prevCerts.map((cert, i) =>
        i === index
          ? {
              ...cert,
              noExpiry: !cert.noExpiry, // Toggle the noExpiry value
              validFrom: !cert.noExpiry ? "" : cert.validFrom, // Clear dates if enabling noExpiry
              validTill: !cert.noExpiry ? "" : cert.validTill,
            }
          : cert
      )
    );

    setNoExpiryStates((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index]; // Toggle the state for the index
      return updated;
    });
  };
  const handleCertificationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setCertifications((prev) =>
      prev.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert))
    );
  };

  const handleSubmit = () => {
    console.log(certifications);
    const updateCertification = useResumeStore.getState().addCertification;
    updateCertification(certifications);
    redirect("/skills");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full justify-end items-center">
        <SecondaryButton
          text="Add Certification"
          className="bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite p-2"
          icon={<FaPlus />}
          onClickMethod={addCertification}
        />
      </div>
      {certifications.length === 0 ? (
        <div className="flex flex-col gap-4 bg-CareerCraftPrimary/10 p-4 rounded-lg shadow-lg w-full">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-CareerCraftWhite text-sm">
              You have not added any certification yet
            </span>
          </div>
        </div>
      ) : (
        <form action={handleSubmit} className="flex flex-col gap-4 w-full ">
          {certifications.map((certification, index) => (
            <div
              key={certificationIds[index]}
              className="flex flex-col gap-4 bg-CareerCraftPrimary/10 p-4 rounded-lg shadow-lg w-full"
            >
              <div
                className="flex justify-between gap-2 items-center cursor-pointer w-full"
                onClick={() => toggleOpen(index)}
              >
                <div className="flex items-center justify-between flex-1">
                  <p className="text-CareerCraftText text-sm">
                    {certification.title} - {certification.authority}
                  </p>
                  {openStates[index] ? <FaAngleUp /> : <FaAngleDown />}
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
                    onClickMethod={() => deleteCertification(index)}
                  />
                </div>
              </div>

              {openStates[index] && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row w-full flex-wrap gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="text-CareerCraftWhite text-sm font-medium">
                        Certification Name
                      </label>
                      <Input
                        className="rounded-md"
                        required
                        name="name"
                        placeholder="Certification Name"
                        value={certification.title}
                        onChange={(e) =>
                          handleCertificationChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="text-CareerCraftWhite text-sm font-medium">
                        Issuing Organization
                      </label>
                      <Input
                        className="rounded-md"
                        required
                        name="authority"
                        placeholder="Issuing Organization"
                        value={certification.authority}
                        onChange={(e) =>
                          handleCertificationChange(
                            index,
                            "authority",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* <div className="flex flex-col md:flex-row w-full gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="text-CareerCraftWhite text-sm font-medium">
                        Valid From
                      </label>
                      <Input
                        placeholder="Valid From"
                        required={!certifications[index].noExpiry} // Required if noExpiry is false
                        disabled={certifications[index].noExpiry} // Disabled if noExpiry is true
                        type="date"
                        name="validFrom"
                        className={clsx("rounded-md", {
                          "opacity-50 cursor-not-allowed":
                            certifications[index].noExpiry, // Add styles for disabled fields
                        })}
                        value={certification.validFrom}
                        onChange={(e) =>
                          handleCertificationChange(
                            index,
                            "validFrom",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="text-CareerCraftWhite text-sm font-medium">
                        Valid Till
                      </label>
                      <Input
                        placeholder="Valid Till"
                        required={!certifications[index].noExpiry} // Required if noExpiry is false
                        disabled={certifications[index].noExpiry} // Disabled if noExpiry is true
                        type="date"
                        name="validTill"
                        className={clsx("rounded-md", {
                          "opacity-50 cursor-not-allowed":
                            certifications[index].noExpiry, // Add styles for disabled fields
                        })}
                        value={certification.validTill}
                        onChange={(e) =>
                          handleCertificationChange(
                            index,
                            "validTill",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <span className="flex gap-2 text-sm text-CareerCraftText items-center">
                    <input
                      type="checkbox"
                      name="noExpiry"
                      checked={certifications[index].noExpiry}
                      onChange={() => handleNoExpiryToggle(index)}
                    />
                    <span>No expiry date</span>
                  </span> */}

                  <div className="flex flex-col gap-2">
                    <label className="text-CareerCraftWhite text-sm font-medium">
                      Credential ID
                    </label>
                    <Input
                      required={false}
                      name="credentialId"
                      className="rounded-md"
                      placeholder="Credential ID"
                      value={certification.licenseNumber}
                      onChange={(e) =>
                        handleCertificationChange(
                          index,
                          "credentialId",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center items-center gap-2">
            <FormSubmitButton
              buttonText="Save & Continue"
              // icon={<FaStepForward />}
              pendingText="Saving Certifications..."
              className="bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark text-CareerCraftWhite p-2"
              type="submit"
            ></FormSubmitButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default CertificationForm;
