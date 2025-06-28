import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function LatestJob() {
    const {allJobs}=useSelector(store=>store.job);
     const latestJobs = [...allJobs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  return (
    <div className='md:gap-x-12  px-5 lg:px-32  '>
        <h1 className='text-xl md:text-4xl font-bold text-[#1717a2]  '>Latest & Top <span className='text-black'>Job Openings</span></h1>
        <div className='grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-y-9 gap-x-5  my-5 md:my-10'>

          {
           ( latestJobs.length<=0)?<span>Jobs Not Found</span>
:            latestJobs.slice(0,6).map((job,idx)=>(
                <LatestJobCard  key={job._id} job={job} />
            ))
          }
        </div>
    </div>
  )
}
