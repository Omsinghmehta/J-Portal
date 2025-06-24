import React, { useState } from "react";
import { toast } from "sonner";

export default function ResumeForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    summary: "",
    skills: "",
    education: "",
    projects: "",
    twitter: "",
    coding_plateform: "",
  });

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fields = [
    ["name", "Full Name"],
    ["email", "Email"],
    ["phone", "Phone Number"],
    ["address", "Current Address"],
    ["linkedin", "LinkedIn"],
    ["github", "Github"],
    ["summary", "Brief Summary"],
    ["skills", "Skills"],
    ["education", "Education"],
    ["projects", "Projects"],
    ["coding_plateform", "Coding Profile"],
    ["twitter", "Twitter"],
  ];
  return (
    <>
      <div className="max-w-3xl mx-auto border p-6 bg-gray-50 mt-9 rounded shadow">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
            toast.success("Scroll Down For Download")
          }}
        >
          <h1 className="text-2xl font-bold text-center underline mb-4">
            Fill Resume Details
          </h1>

          {fields.map(([name, holder]) => (
            <div key={name} className="flex flex-col">
              <label className="mb-1 font-semibold">{holder}</label>
              {["summary", "projects", "skills", "education"].includes(name) ? (
                <textarea
                  name={name}
                  onChange={handlechange}
                  rows={4}
                  placeholder={holder}
                  className="rounded p-2 border border-gray-300"
                  value={form[name]}
                />
              ) : (
                <input
                  name={name}
                  onChange={handlechange}
                  placeholder={holder}
                  className="rounded p-2 border border-gray-300"
                  value={form[name]}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="px-4 py-2 w-full bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Generate Resume
          </button>
        </form>
      </div>
    </>
  );
}
