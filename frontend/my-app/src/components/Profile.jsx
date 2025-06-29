import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact2, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hook/useGetAppliedJobs";

export default function Profile() {
  useGetAppliedJobs();
  const {allAppliedJobs}=useSelector(store=>store.job)
  const [open, setopen] = useState(false);
  const{user}=useSelector(store=>store.auth);
  console.log(user)
  return (
    <div>
      <Navbar />
      <div className="px-7">
        <div className="rounded-2xl max-w-220 mx-auto shadow-2xl h-fit mt-10  bg-gray-100 p-2 md:p-0">
          <div className="max-w-210  flex items-center justify-between ">
            <Avatar className="m-5 md:m-10 ">
              <AvatarImage
                src={user?.profile?.photo || "https://th.bing.com/th?q=User+Placeholder+Dummy&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"}
                className="h-9 w-20 md:h-18 md:w-20 rounded-md"
              ></AvatarImage>
            </Avatar>
            <div className="w-2xl h-2xl">
              <h1 className="font-[600] text-base md:text-2xl">{user?.fullname}</h1>
              <p className="text-xs md:text-base">
               {user?.profile?.bio}
              </p>
            </div>
            <span
              onClick={() => setopen(true)}
              className="ml-5 md:ml-12 border border-gray-400 p-1 rounded "
            >
              <Pen className="max-sm:size-4"/>{" "}
            </span>
          </div>

          <div className="ml-5 md:ml-10 mt-2 md:mt-5  flex flex-col gap-y-1 md:gap-y-2">
            <div className="flex  gap-2 md:gap-4 text-xs md:text-base">
              <Mail className="max-sm:size-4"/> {user?.email}
            </div>
            <div className="flex gap-2 md:gap-4 text-xs md:text-base">
              {" "}
              <Contact2 className="max-sm:size-4"/>{user?.phoneNumber}
            </div>
          </div>

          <div className="ml-5 md:ml-10 mt-2 md:mt-5 text-xs md:text-base max-sm:space-y-1">
            <h1>Skills</h1>
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills.map((item, idx) => (
                <Badge
                  className="bg-black text-white rounded-xl text-[9px] max-xs:size-fit md:text-base mr-1 md:mr-2"
                  key={idx}
                >
                  {item}
                </Badge>
              ))
            ): (
              <span>Na</span>
            )
          }
          </div>
        
          <div className="ml-5 md:ml-10 mt-1 md:mt-2 pb-5 text-xs md:text-base">
            <h1>Resume</h1>
            <a
                 href={user?.profile?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline "
            >
             {user?.profile?.resumeOriginalName}
            </a>
            
          </div>
        </div>

        <div className="max-w-220 mx-auto mt-10">
          <h1 className="mb-5 font-bold text-sm md:text-2xl"> Applied Jobs</h1>

          <Table className="p-3 max-sm:text-xs">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Jobe Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            {allAppliedJobs.length<=0?<span>You haven't applied any job yet</span>: allAppliedJobs.map((item, idx) => (
              <TableBody>
                <TableRow key={item._id}>
                  <TableCell> {new Date(item?.job?.createdAt.split('T')[0]).toLocaleDateString()}</TableCell>
                  <TableCell>{item?.job?.title}</TableCell>
                  <TableCell>{item?.job?.company?.name}</TableCell>
                  <TableCell>
                    <Badge className={item?.status==='rejected'?'bg-red-600 size-fit max-sm:text-[9px] text-white':item?.status==='pending'?'bg-gray-600 size-fit max-sm:text-[9px] text-white':item?.status==='accepted'?'bg-green-600 size-fit max-sm:text-[9px] text-white':""}>
                      {item?.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
      <UpdateProfileDialog open={open} setopen={setopen} />
    </div>
  );
}
