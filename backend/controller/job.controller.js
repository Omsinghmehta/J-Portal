import { Job } from "../models/job.model.js";
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, deadline,position, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "something is missing",
        success: false
      })
    }

    const job = await Job.create({
      title,
      description,
      requirements: typeof requirements === "string" ? requirements.split(",") : requirements,
      salary: Number(salary),
      location,
      jobType,
      experience: Number(experience),
      position: Number(position),
      deadline:new Date(deadline),
      company: companyId,
      created_by: userId
    })
    return res.status(200).json({
      message: "new job created successfully",
      success: true
    })
  }
  catch (E) {
    console.log(E);
  }
}
export const getAllJobs = async (req, res) => {
  try {
    const today=new Date;
    const keyword = req.query.keyword || "";
    const query = {
      deadline:{$gt:today},
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    }
    const jobs = await Job.find(query).populate({
      path: "company"
    });
    if (!jobs) {
      return res.status(404).json({
        message: "job not found",
        success: false
      })
    }
    return res.status(200).json({
      jobs,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'applications'
    });
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false
      })
    }

    res.status(200).json({
      job,
      success: true
    })
  }
  catch (e) {
    console.log(e);
  }
}
export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: 'company',
    }).sort({createdAt:-1});
    
    if (!jobs) {
      return res.status(404).json({
        message: "job not found",
        success: false
      })
    }
    res.status(200).json({
      jobs,
      success: true
    })
  }
  catch (e) {
    console.log(e);
  }
}

export const updateJob=async(req,res)=>{
try {
        const {title,description,requirements,jobType,location,salary,position,experience,deadline,company}=req.body;
      console.log(title)
        const updateData={title,description,requirements,jobType,location,salary,position,experience,deadline,company};

        const Jobu=await Job.findByIdAndUpdate(req.params.id,updateData);


        if(!Jobu)
        {
            return res.status(201).json({
                message:"Job not founded",
                success:false
            })
        }
        return res.status(201).json({
            message:"Job info updated successfully",
            success:true
        })
    
} catch (error) {
    console.log(error)
}}