import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByText } from "../Redux/companySlice";
export default function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div>
        <div className=" px-8 md:px-32 my-5 md:my-10 flex justify-between  ">
          <input type="text" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)} className=" border px-2 py-1 rounded md:px-4 md:py-2 focus:outline-0 border-gray-500 text-[10px] md:text-base" />
          <button
            className="bg-black px-2 py-1 rounded md:px-4 md:py-2 text-white cursor-pointer max-sm:size-fit max-sm:text-[10px]"
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </button>
        </div>
        <CompanyTable />
      </div>
    </div>
  );
}
