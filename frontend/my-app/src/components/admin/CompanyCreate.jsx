import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";

export default function CompanyCreate() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.success("Company Created Successfully");

        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-8 md:px-12 mt-4 md:my-8 ">
        <div className="mt-5 mt:my-10 space-y-1 md:space-y-2 mb-2 md:mb-5">
          <h1 className="font-bold text-sm md:text-2xl">Your Company Name</h1>
          <p className="text-gray-500 text-xs md:text-sm">
            What would you like to give your company name, You can change this
            later
          </p>
        </div>

        <label className="text-xs md:text-sm ">Company Name</label>
        <br/>
        <input
          type="text"
          placeholder="Google, Microsoft etc"
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full my-3 focus:outline-0 border border-gray-500 rounded text-xs md:text-sm p-1 md:p-2 "
        ></input>
        <div className="space-x-2 my-2 md:space-x-4 md:my-5 ">
          <button className="text-sm md:text-base px-2 py-1 md:px-4 md:py-2 rounded" onClick={() => navigate("/admin/companies")}>Cancel</button>
          <button className="text-white bg-black text-sm md:text-base px-2 py-1 md:px-4 md:py-2 rounded"  onClick={registerNewCompany} disabled={!companyName.trim() }>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
