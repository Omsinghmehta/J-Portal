import { Badge } from "@/components/ui/badge"
import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LatestJobCard({job}) {

  
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='flex flex-col gap-5 shadow-md lg:shadow-xl p-3 md:p-5   bg-gray-100 rounded-2xl'>
      <div> 

      <h1 className='text-xs md:text-xl font-bold-[100] md:mb-1'>{job?.company?.name}</h1>
      <p className='text-xs md:text-md text-[gray]'>{job?.company?.location} </p>
      </div>

      <div>
        <h1 className=' tex-sm md:text-xl font-bold md:mb-1'>{job?.title}</h1>
        <p className=' text-[10px] md:text-base'>{job?.description}</p>
      </div>

      <div className='flex '>
        <Badge  className='text-xs md:text-base text-[#2b2bcf]'>{job?.position} position</Badge>
        <Badge className='text-xs md:text-base text-[#e81f1f]'>{job?.jobType}</Badge>
        <Badge className='text-xs md:text-base text-[#8f05da]'>{job?.salary}LPA</Badge>
      </div>
    </div>

  )
}
