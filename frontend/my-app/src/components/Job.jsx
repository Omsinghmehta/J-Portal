import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { motion } from "framer-motion";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import Footer from "./Footer";
export default function Job() {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterjobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (searchQuery) {
      const filtered = allJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [searchQuery, allJobs]);

  return (
    <>
      <Navbar />
      <div className="mt-5 md:mt-10 max-w-full max-h-full">
        <div className="flex  px-5 lg:px-32 flex-1 mb-20 md:mb-50">
          <div className=" w-[30%] md:w-[25%]  flex gap-5 flex-col ">
            <FilterCard />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className=" mt-5  ml-3 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto  "
          >
            {filterjobs.length <= 0 ? (
              <span>Jobs Not Found</span>
            ) : (
              filterjobs.map((job, idx) => <JobCard key={job._id} job={job} />)
            )}
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
