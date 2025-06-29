import React, { useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumeDownload from "./ResumeDownload";
import Navbar from "./shared/Navbar";

export default function ResumeGeneratorPage() {
  const [FormData, setFormData] = useState(null);
  return <div className="min-h-screen">
     <Navbar/>
   <ResumeForm onSubmit={(data)=>setFormData(data)}/>
    {
      FormData && <ResumeDownload FormData={FormData}/>
    }
  </div>
}
