import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  section: { marginBottom: 12 },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    textDecoration:"underline"

  },
  subHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
    borderBottom: "1px solid #000",
    paddingBottom: 2,
  },
  contactLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  text: {
    marginBottom: 2,
    lineHeight: 1,
  },
  link: {
    fontSize: 8,
    color: "blue",
    marginBottom: 2,
  },
  bullet: {
    marginLeft: 10,
    lineHeight: 1,
  },
});

export default function ResumePDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.header}>{data.name}</Text>
        </View>

        {/* Contact Details */}
        <View style={styles.section}>
          <Text style={styles.contactLabel}>Phone: {data.phone}</Text>
          <Text style={styles.contactLabel}>Email: {data.email}</Text>
          <Text style={styles.contactLabel}>LinkedIn: {data.linkedin}</Text>
          <Text style={styles.contactLabel}>Github: {data.github}</Text>

        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Brief Summary</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Key Expertise</Text>
          <Text style={styles.text}>{data.skills}</Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Education</Text>
          {data.education?.split("\n").map((line, idx) => (
            <Text key={idx} style={styles.text}>• {line}</Text>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Projects</Text>
          {data.projects?.split("\n").map((line, idx) => (
            <Text key={idx} style={styles.bullet}>{line}</Text>
          ))}
        </View>

        {/* Web Links */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Web Links</Text>
          <Text style={styles.link}>Coding-Pateform: {data.coding_plateform}</Text>
          <Text style={styles.link}>Twitter: {data.twitter}</Text>
        </View>
      </Page>
    </Document>
  );
}
