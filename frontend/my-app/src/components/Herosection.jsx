import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroText from "./HeroText";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "./Redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Herosection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div >
      <div className="flex flex-col items-center gap-3 md:gap-7 mt-[2vh] md:mt-[4vh] align-middle  ">
        <span className="text-[#ff0000] text-md rounded-full mx-auto text-center  ">
          {<HeroText />}
        </span>
        <h1 className="text-xl md:text-5xl font-bold ">
          <span className="mx-5 md:mx-12">Search, Apply &</span> <br /> Get Your
          <span className="text-[#1900ff]"> Dream Jobs</span>
        </h1>
        <p className="text-gray-500  text-center w-[40%]    max-md:text-[7px]">
          "Explore top job listings, apply instantly, and land your dream role
          today."
        </p>
        <div className=" flex">
          <input
            type="text"
            aria-label="Search for jobs"
            placeholder={"Find Your Dream Jobs"}
            onChange={(e) => setQuery(e.target.value)}
            className="border text-[8px] md:text-[15px] border-transparent hover:border-blue-500 focus:border-blue-500 outline-none h-8 w-35 md:h-13 md:w-100 rounded-l-full shadow-xl px-2 py-1  md:px-3 md:py-3"
          />
          <Button
            onClick={changeHandler}
            className="rounded-r-full bg-blue-600 h-8 max-sm:w-4 md:h-13 "
          >
            <Search color="white"></Search>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Herosection;
