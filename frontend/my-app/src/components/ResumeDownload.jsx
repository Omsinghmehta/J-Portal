import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

export default function ResumeDownload({ FormData }) {
  return (
    <div className="text-center mt-4">
      <PDFDownloadLink
        document={<ResumePDF data={FormData} />}
        fileName="Resume.pdf"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {({ loading }) =>
          loading ? "Preparing document..." : "Download Resume PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}
