import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Badge } from "./ui/badge";
import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toggleBookmark } from "./BookmarksAction";
import { useDispatch, useSelector } from "react-redux";

export default function JobCard({ job }) {
  const {bookmarks}=useSelector(store=>store.bookmarks);
  const isbookmark=bookmarks.includes(job?._id);
  const dispatch = useDispatch();

  const handleBookmark = () => {
    dispatch(toggleBookmark(job?._id));
  };

  const daysAgoFunction = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const currDate = new Date();

    const diff = Math.floor((currDate - createdAt) / (1000 * 60 * 60 * 24));
    return diff;
  };
  const daysLeft = (deadline) => {
    const today = new Date();
    const endDate = new Date(deadline);
    const diff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    return diff <= 0 ? "Expired" : `${diff} days left`;
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 md:gap-5 shadow-md lg:shadow-xl p-3 md:p-5  h-fit bg-gray-50 rounded">
      <div className="flex justify-between text-xs md:text-base">
        <p>
          {daysAgoFunction(job?.createdAt) == 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        {isbookmark?<BookmarkCheck className="rounded-full shadow-md max-sm:size-4"></BookmarkCheck>:<Bookmark className="max-sm:size-4"></Bookmark>}
        
      </div>

      <div className="flex ">
        <Avatar className="mr-3">
          <AvatarImage src={job?.company?.logo} className="h-6 w-6 md:h-8 md:w-8 object-scale-down" />
        </Avatar>
        <div className="">
          <h1 className="font-[600] text-xs md:text-xl">{job?.company?.name}</h1>
          <p className="text-gray-400 text-[10px] md:text-sm">{job?.company?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-[700] text-xs md:text-base">{job?.title}</h1>
        <p className="text-gray-500 text-xs md:text-base">{job?.description}</p>

        <div className="flex  md:gap-5 mt-1 md:mt-3">
          <Badge className=" font-bold text-[#2b2bcf]">
            {job?.position} position
          </Badge>
          <Badge className="font-bold text-[#e81f1f]">{job?.jobType}</Badge>
          <Badge className="font-bold text-[#8f05da]">{job?.salary} LPA</Badge>
        </div>
      </div>

      <div className="space-x-1">
        <button
          onClick={() => navigate(`/description/${job._id}`)}
          className="border-gray-800 bg-gray-300 hover:bg-gray-200 text-xs md:text-base px-2 py-1 md:px-4 md:py-2 rounded"
        >
          Details
        </button>
        <button
          className="bg-[#1010f1] text-white shadow hover:bg-[#3d3dff]  text-xs md:text-base px-2 py-1 md:px-4 md:py-2 rounded"
          onClick={handleBookmark}
        >
         { isbookmark?"Unsave": "Bookmark"}
        </button>
      </div>
      <div className="flex justify-between text-xs md:text-base">
        <p className="text-red-600  ">
          Deadline: {new Date(job?.deadline?.split("T")[0]).toLocaleDateString()} 
        </p>
        <p>[{daysLeft(job?.deadline)}]⌛</p>
      </div>
    </div>
  );
}
