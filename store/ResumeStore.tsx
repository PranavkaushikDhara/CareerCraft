import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ContactDetails {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface Work {
  title: string;
  company: string;
  city: string;
  state: string;
  country: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  currentJob: boolean;
  responsibilityIds: string[];
}

export interface Education {
  college: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  city: string;
  state: string;
  country: string;
  currentEducation?: boolean;
}

export interface Skill {
  name: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface Certification {
  title: string;
  authority: string;
  validFrom: string;
  validTill: string;
  licenseNumber: string;
  noExpiry: boolean;
}

export interface ResumeStore {
  summary: string;
  firstname: string;
  lastname: string;
  address: Address;
  contactDetails: ContactDetails;
  educationDetails: Education[];
  workExperience: Work[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];

  // Actions
  addSummary: (summary: string) => void;
  addFirstName: (firstname: string) => void;
  addLastName: (lastname: string) => void;
  addContact: (contactDetails: ContactDetails) => void;
  addEducation: (educationDetails: Education[]) => void;
  addWorkExperience: (workExperience: Work[]) => void;
  addSkill: (skills: Skill[]) => void;
  addProject: (projects: Project[]) => void;
  addAddress: (address: Address) => void;
  addCertification: (certifications: Certification[]) => void;
  loadResumeData: (data: Partial<ResumeStore>) => void;
  clearResumeData: () => void;
}

const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      summary: "",
      firstname: "",
      lastname: "",
      address: {
        city: "",
        state: "",
        country: "",
      },
      contactDetails: {
        phone: "",
        email: "",
        linkedin: "",
        github: "",
      },
      certifications: [],
      educationDetails: [],
      workExperience: [],
      skills: [],
      projects: [],

      // Actions
      addSummary: newSummary => set({ summary: newSummary }),
      addFirstName: newFirstName => set({ firstname: newFirstName }),
      addLastName: newLastName => set({ lastname: newLastName }),
      addContact: newContactDetails =>
        set({ contactDetails: newContactDetails }),
      addEducation: newEducationDetails =>
        set({ educationDetails: newEducationDetails }),
      addWorkExperience: newWorkExperience =>
        set({ workExperience: newWorkExperience }),
      addSkill: newSkills => set({ skills: newSkills }),
      addProject: newProjects => set({ projects: newProjects }),
      addAddress: newAddress => set({ address: newAddress }),
      addCertification(certifications) {
        set({ certifications });
      },
      loadResumeData(data) {
        set(data);
      },
      clearResumeData() {
        set({
          summary: "",
          firstname: "",
          lastname: "",
          address: {
            city: "",
            state: "",
            country: "",
          },
          contactDetails: {
            phone: "",
            email: "",
            linkedin: "",
            github: "",
          },
          certifications: [],
          educationDetails: [],
          workExperience: [],
          skills: [],
          projects: [],
        });
      },
    }),
    {
      name: "resume-storage",
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // If version is 0 or undefined, it's the old format
        if (version === 0 || version === undefined) {
          // Handle migration from old format to new format
          if (persistedState && typeof persistedState === "object") {
            // If the old state has a 'state' property, extract it
            if (persistedState.state) {
              return persistedState.state;
            }
            // If it's already in the correct format, return as is
            return persistedState;
          }
        }
        // For current version, return as is
        return persistedState;
      },
    }
  )
);

export default useResumeStore;
