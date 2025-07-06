import { ResumeStore } from "@/store/ResumeStore";
import { Font, StyleSheet } from "@react-pdf/renderer";
import { Document, Page, Text, View } from "@react-pdf/renderer";

interface MakeProps {
  resumeStore: ResumeStore;
}
Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v13/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});

export const MakePDF = (props: MakeProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {props.resumeStore?.firstname} {props.resumeStore?.lastname}
          </Text>
          <Text style={styles.contact}>
            {props.resumeStore?.contactDetails.email} |{" "}
            {props.resumeStore?.contactDetails.phone}
            {props.resumeStore?.contactDetails.github &&
              ` | ${props.resumeStore?.contactDetails.github}`}
            {props.resumeStore?.contactDetails.linkedin &&
              ` | ${props.resumeStore?.contactDetails.linkedin}`}
          </Text>
        </View>

        {/* Summary Section */}
        {props.resumeStore?.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.content}>{props.resumeStore.summary}</Text>
          </View>
        )}

        {/* Education Section */}
        {props.resumeStore?.educationDetails?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {props.resumeStore.educationDetails.map((education, index) => (
              <View key={index} style={styles.item}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.jobTitle}>
                      {education.degree} in {education.fieldOfStudy}
                    </Text>
                    <Text style={styles.company}>{education.college}</Text>
                  </View>
                  <Text style={styles.dates}>
                    <Text style={styles.location}>
                      {education.city}, {education.state}, {education.country}
                    </Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {props.resumeStore?.workExperience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {props.resumeStore.workExperience.map((experience, index) => (
              <View key={index} style={styles.item}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{experience.title}</Text>
                    <Text style={styles.company}>{experience.company}</Text>
                  </View>
                  <Text style={styles.dates}>
                    {experience.startDate} - {experience.endDate || "Present"}
                  </Text>
                </View>
                {experience.responsibilities.map((responsibility, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <View style={styles.bullet} />
                    <Text style={styles.responsibility}>{responsibility}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {props.resumeStore?.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {props.resumeStore.skills.map((skillCategory, index) => (
              <View key={index} style={styles.skillCategory}>
                <Text style={styles.skillContent}>
                  <Text style={styles.skillTitle}>{skillCategory.name}:</Text>
                  {` ${skillCategory.skills.join(", ")}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects Section */}
        {props.resumeStore?.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {props.resumeStore.projects.map((project, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.jobTitle}>{project.title}</Text>
                {project.description.map((desc, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <View style={styles.bullet} />
                    <Text style={styles.responsibility}>{desc}</Text>
                  </View>
                ))}
                <Text style={styles.technologies}>
                  Technologies: {project.technologies.join(", ")}
                </Text>
                {project.link && (
                  <Text style={styles.link}>{project.link}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications Section */}
        {props.resumeStore?.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {props.resumeStore.certifications.map((cert, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.jobTitle}>{cert.title}</Text>
                <Text style={styles.company}>{cert.authority}</Text>
                {/* <Text style={styles.dates}>
                  {cert.validFrom} -{" "}
                  {cert.noExpiry ? "No Expiry" : cert.validTill}
                </Text>
                <Text style={styles.certNumber}>
                  License: {cert.licenseNumber}
                </Text> */}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: "0.5in",
    size: "LEGAL",
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  section: {
    // marginBottom: 8,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    marginBottom: 11,
  },
  contact: {
    fontSize: 11,
    color: "#444",
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",

    marginBottom: 4,
    // padding: 4,
    // backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  item: {
    marginBottom: 8,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 13,

    fontFamily: "Helvetica-Bold",
  },
  company: {
    fontSize: 11,
    fontStyle: "italic"
  },
  location: {
    fontSize: 11,
    color: "#000",
  },
  dates: {
    fontSize: 11,
  },
  bulletPoint: {
    fontSize: 11,
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: "#000",
    borderRadius: 3,
    marginRight: 3,
    marginTop: 6,
  },
  responsibility: {
    fontSize: 11,
    marginLeft: 11,
    marginBottom: 2,
    lineHeight: 1.4,
    flex: 1,
  },
  content: {
    fontSize: 11,
    marginBottom: 4,
  },
  skillCategory: {
    marginBottom: 4,
  },
  skillTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  skillContent: {
    fontSize: 11,
  },
  technologies: {
    fontSize: 11,
    color: "#000",
    // marginTop: 2,
  },
  link: {
    fontSize: 11,
    color: "#0066cc",
    // marginTop: 2,
  },
  certNumber: {
    fontSize: 11,
    color: "#000",
  },
});

export default MakePDF;
