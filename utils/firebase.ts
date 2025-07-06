import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { database } from "@/app/firebaseConfig";
import { ResumeStore } from "@/store/ResumeStore";
import { User } from "firebase/auth";

export interface ResumeDocument {
  userId: string;
  userEmail: string | null;
  title: string;
  template: string;
  createdAt: Date;
  updatedAt: Date;
  contact: {
    firstname: string;
    lastname: string;
    contactDetails: {
      phone: string;
      email: string;
      linkedin: string;
      github: string;
    };
    address: {
      city: string;
      state: string;
      country: string;
    };
  };
  summary: string;
  experience: any[];
  education: any[];
  skills: any[];
  projects: any[];
  certifications: any[];
}

/**
 * Check if user has an existing resume
 * @param user - The authenticated user
 * @returns Promise<boolean>
 */
export const hasExistingResume = async (user: User): Promise<boolean> => {
  try {
    const resumeDocRef = doc(database, "resumes", user.uid);
    const resumeDoc = await getDoc(resumeDocRef);
    return resumeDoc.exists();
  } catch (error) {
    console.error("Error checking existing resume:", error);
    return false;
  }
};

/**
 * Load resume data for the current user
 * @param user - The authenticated user
 * @returns Promise<ResumeDocument | null>
 */
export const loadResumeData = async (
  user: User
): Promise<ResumeDocument | null> => {
  try {
    const resumeDocRef = doc(database, "resumes", user.uid);
    const resumeDoc = await getDoc(resumeDocRef);

    if (resumeDoc.exists()) {
      return resumeDoc.data() as ResumeDocument;
    } else {
      console.log("No resume found for user:", user.uid);
      return null;
    }
  } catch (error) {
    console.error("Error loading resume data:", error);
    return null;
  }
};

/**
 * Load resume data and populate Zustand store
 * @param user - The authenticated user
 * @returns Promise<ResumeStore | null>
 */
export const loadResumeToLocalStorage = async (
  user: User
): Promise<ResumeStore | null> => {
  try {
    const resumeData = await loadResumeData(user);

    if (!resumeData) {
      return null;
    }

    // Convert Firestore data to ResumeStore format
    const resumeStoreData: Partial<ResumeStore> = {
      summary: resumeData.summary || "",
      firstname: resumeData.contact.firstname || "",
      lastname: resumeData.contact.lastname || "",
      address: resumeData.contact.address || {
        city: "",
        state: "",
        country: "",
      },
      contactDetails: resumeData.contact.contactDetails || {
        phone: "",
        email: "",
        linkedin: "",
        github: "",
      },
      educationDetails: resumeData.education || [],
      workExperience: resumeData.experience || [],
      skills: resumeData.skills || [],
      projects: resumeData.projects || [],
      certifications: resumeData.certifications || [],
    };

    // Import the store dynamically to avoid circular dependencies
    const { default: useResumeStore } = await import("@/store/ResumeStore");
    const store = useResumeStore.getState();

    // Load data into the store
    store.loadResumeData(resumeStoreData);

    return store;
  } catch (error) {
    console.error("Error loading resume to store:", error);
    return null;
  }
};

/**
 * Clear localStorage and prepare for new resume
 */
export const clearResumeData = (): void => {
  localStorage.removeItem("resume-storage");
  localStorage.removeItem("resumeData");

  // Also clear the Zustand store
  import("@/store/ResumeStore").then(({ default: useResumeStore }) => {
    const store = useResumeStore.getState();
    store.clearResumeData();
  });
};

/**
 * Save resume data for the current user (creates or updates)
 * @param user - The authenticated user
 * @param resumeData - The resume data to save
 * @returns Promise<boolean>
 */
export const saveResumeData = async (
  user: User,
  resumeData: ResumeStore
): Promise<boolean> => {
  try {
    const resumeDocRef = doc(database, "resumes", user.uid);

    const documentData: ResumeDocument = {
      userId: user.uid,
      userEmail: user.email,
      title: `${resumeData.firstname} ${resumeData.lastname} - Resume`,
      template: "default",
      createdAt: new Date(),
      updatedAt: new Date(),
      contact: {
        firstname: resumeData.firstname,
        lastname: resumeData.lastname,
        contactDetails: resumeData.contactDetails,
        address: resumeData.address,
      },
      summary: resumeData.summary,
      experience: resumeData.workExperience,
      education: resumeData.educationDetails,
      skills: resumeData.skills,
      projects: resumeData.projects,
      certifications: resumeData.certifications,
    };

    await setDoc(resumeDocRef, documentData, { merge: true });
    console.log("Resume saved successfully for user:", user.uid);
    return true;
  } catch (error) {
    console.error("Error saving resume data:", error);
    return false;
  }
};

/**
 * Update specific fields in the resume document
 * @param user - The authenticated user
 * @param updates - Object containing fields to update
 * @returns Promise<boolean>
 */
export const updateResumeFields = async (
  user: User,
  updates: Partial<ResumeDocument>
): Promise<boolean> => {
  try {
    const resumeDocRef = doc(database, "resumes", user.uid);

    await updateDoc(resumeDocRef, {
      ...updates,
      updatedAt: new Date(),
    });

    console.log("Resume fields updated successfully for user:", user.uid);
    return true;
  } catch (error) {
    console.error("Error updating resume fields:", error);
    return false;
  }
};
