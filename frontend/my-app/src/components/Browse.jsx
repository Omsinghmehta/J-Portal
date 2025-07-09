import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hook/useGetAllJobs";
import { setSearchQuery } from "./Redux/jobSlice";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function Browse() {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, []);
  return (
    <div>
      <Navbar />
      <motion.div initial={{opacity:0, x:100}} animate={{opacity:1,x:0}} transition={{duration:0.3}} className="px-5 mb-20 md:mb-50 lg:px-32 mt-5 md:mt-10 ">
        <h1 className="font-bold text-base md:text-2xl">Search Result:({allJobs.length})</h1>

        <div className="mt-5  ml-3 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto ">
          {allJobs.map((job, idx) => (
            <JobCard id={job._id} job={job} />
          ))}
        </div>
      </motion.div>
      <Footer className="relative bottom-0 "/>
    </div>
  );
}
