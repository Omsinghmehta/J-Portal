import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hook/useGetCompanyById";

export default function CompanySetUp() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const params = useParams();
  const id = params.id;

  useGetCompanyById(id);
  const { singleCompany } = useSelector((store) => store.company);

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFiletHandler = (e) => {
    setInput({ ...input, file: e.target?.files?.[0] });
  };

  const submitHandler = async (e) => {
    setloading(true);
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("location", input.location);
    formdata.append("website", input.website);
    formdata.append("description", input.description);
    if (input.file) formdata.append("file", input.file);

    try {
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-16 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-center sm:text-left">
            Company Setup
          </h1>
        </div>

        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label className="text-md mb-2 block">Company Name</Label>
              <Input
                name="name"
                type="text"
                value={input.name}
                onChange={changeEventHandler}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-md mb-2 block">Description</Label>
              <Input
                name="description"
                type="text"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-md mb-2 block">Website</Label>
              <Input
                name="website"
                type="text"
                value={input.website}
                onChange={changeEventHandler}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-md mb-2 block">Location</Label>
              <Input
                name="location"
                type="text"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-md mb-2 block">Logo</Label>
              <Input
                name="file"
                type="file"
                accept="image/*"
                onChange={changeFiletHandler}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <Button className="w-full bg-black text-white" disabled>
                <Loader2 className="animate-spin mr-2" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full bg-black text-white">Update</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
