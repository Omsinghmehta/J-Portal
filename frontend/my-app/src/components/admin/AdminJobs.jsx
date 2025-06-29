import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hook/useGetAllAdminJobs";
import { setSearchJobByText } from "../Redux/jobSlice";
export default function AdminJobs() {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div>
        <div className="px-5 md:px-32 my-5 md:my-10 flex justify-between ">
          <input
            type="text"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
            className="border px-2 py-1 rounded md:px-4 md:py-2 focus:outline-0 border-gray-500 text-[10px] md:text-base "
          />
          <button
            className="bg-black px-2 py-1 rounded md:px-4 md:py-2 text-white cursor-pointer max-sm:size-fit max-sm:text-[10px]"
            onClick={() => navigate("/admin/jobs/create")}
          >
            Post New Jobs
          </button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}
