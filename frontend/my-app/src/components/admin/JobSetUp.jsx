import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetJobById from "@/hook/useGetJobById";
// import { setSingleJob } from "../Redux/JobSlice";

export default function JobSetUp() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    jobType: "",
    location: "",
    salary: "",
    experience:"",
    position:"",
    requirements:"",
    deadline:""
    
  });
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const params = useParams();

  const id = params.id;
  useGetJobById(id);
 const {singleJob} = useSelector(store=>store.job);

  useEffect(() => {
    setInput({
      title: singleJob?.title || "",
      description: singleJob?.description || "",
      jobType: singleJob?.jobType || "",
      location: singleJob?.location || "",
      salary: singleJob?.salary || "",
      experience: singleJob?.experience || "",
      position: singleJob?.position || "",
      requirements: singleJob?.requirements || "",
      deadline: singleJob?.deadline || "",

    });
  }, [singleJob]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFiletHandler = (e) => {
    setInput({ ...input, file: e.target?.files?.[0] });
  };
  const submitHandler = async (e) => {
    setloading(true);
    e.preventDefault();
    console.log(input);
    const formdata = new FormData();
    formdata.append("title", input.title);
    formdata.append("description", input.description);
    formdata.append("jobType", input.jobType);
    formdata.append("location", input.location);
    formdata.append("salary", input.salary);
    formdata.append("experience", input.experience);
    formdata.append("position", input.position);
    formdata.append("requirements", input.requirements);
    formdata.append("deadline", input.deadline);

    try {
      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update/${params.id}`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Updated Successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error("Error Occured");
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-xl my-[4rem] mx-auto ">
        <div className="flex gap-5">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/jobs")}
          >
            <ArrowLeft></ArrowLeft> Back
          </Button>
          <h1 className="text-xl font-bold">Job Setup</h1>
        </div>
      </div>

   <form onSubmit={submitHandler}>
  <div className="w-[40vw] mx-auto flex flex-wrap gap-3">
    
    <div>
      <Label className="text-md mb-2">Job Title</Label>
      <Input
        name="title"
        type="text"
        className="w-[18rem]"
        value={input.title}
        onChange={changeEventHandler}
      />
    </div>

    <div>
      <Label className="text-md mb-2">Description</Label>
      <Input
        name="description"
        type="text"
        className="w-[18rem]"
        value={input.description}
        onChange={changeEventHandler}
      />
    </div>

    <div>
      <Label className="text-md mb-2">Job Type</Label>
      <Input
        name="jobType"
        type="text"
        className="w-[18rem]"
        value={input.jobType}
        onChange={changeEventHandler}
      />
    </div>

    <div>
      <Label className="text-md mb-2">Location</Label>
      <Input
        name="location"
        type="text"
        className="w-[18rem]"
        value={input.location}
        onChange={changeEventHandler}
      />
    </div>

    <div>
      <Label className="text-md mb-2">Salary</Label>
      <Input
        name="salary"
        type="text"
        className="w-[18rem]"
        value={input.salary}
        onChange={changeEventHandler}
      />
    </div>

    <div>
      <Label className="text-md mb-2">Experience</Label>
      <Input
        name="experience"
        type="text"
        className="w-[18rem]"
        value={input.experience}
        onChange={changeEventHandler}
      />
    </div>

    <div>
      <Label className="text-md mb-2">Position</Label>
      <Input
        name="position"
        type="text"
        className="w-[18rem]"
        value={input.position}
        onChange={changeEventHandler}
      />
    </div>

    <div>
      <Label className="text-md mb-2">Requirements</Label>
      <Input
        name="requirements"
        type="text"
        className="w-[18rem]"
        value={input.requirements}
        onChange={changeEventHandler}
      />
    </div>

    <div>
      <Label className="text-md mb-2">Deadline</Label>
      <Input
        name="deadline"
        type="date"
        className="w-[18rem]"
        value={input.deadline}
        onChange={changeEventHandler}
      />
    </div>

    <div>
      <Label className="text-md mb-2">Logo</Label>
      <Input
        name="file"
        type="file"
        accept="image/*"
        className="w-[18rem]"
        onChange={changeFiletHandler}
      />
    </div>


          {loading ? (
            <Button className=" bg-black text-white w-full mt-4">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className=" bg-black text-white w-full mt-4">Update</Button>
          )}
        </div>
      </form>
    </div>
  );
}
