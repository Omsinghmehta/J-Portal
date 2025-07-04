import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import {Button} from "../ui/button.jsx";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant.js";
import { setUser } from "../Redux/authSlice.js";
import { toast } from "sonner";
const Navbar = () => {
    const {user}=useSelector(store=>store.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const LogoutHandler=async()=>{
      try {
        const res=await axios.get(`${USER_API_ENDPOINT}/logout`,{withCredentials:true});
        if(res.data.success)
        {
          dispatch(setUser(null));
          navigate('/');
          toast.success(res?.data?.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error?.res?.data?.message|| "Error occured");
      }
    }

  return (
    <>
      <div className="flex items-center justify-between px-5 lg:px-32  h-16">
        <div className="text-md md:text-2xl font-bold ">
          <h1>
            <Link to='/'>Talent<span className="text-[#1900ff]">Bridge</span></Link>
          </h1>
        </div>
        <div className=" flex items-center gap-5 md:gap-12 text-[10px] md:text-lg">

          {
            user && user.role=='recruiter'?(
          <ul className="flex font-medium gap-2 md:gap-5">
            <li> <Link to="/admin/companies" className="hover:underline">Companies</Link></li>
            <li><Link to="/admin/jobs"className="hover:underline">Jobs</Link></li>
          </ul>):
             <ul className="flex font-medium gap-2 md:gap-5">
            <li> <Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/jobs"className="hover:underline">Jobs</Link></li>
            <li><Link to="/browse"className="hover:underline">Browse</Link></li>
            {user && <li><Link to="/bookmarks"className="hover:underline">Bookmarks</Link></li>
}
           

          </ul>
          }
       
           {
             !user?(
                    <div className="flex items-center gap-1 md:gap-2"> 
                    <Link to="/login"><button variant="outline" className="text-xs bg-[#dfdfdf] rounded hover:bg-[#e7e4e4] md:text-base px-2 py-1 md:px-4 md:py-2">login</button></Link>
                    <Link to ="/signup"><button className="bg-[#5a168b] text-xs md:text-base px-2 py-1 md:px-4 md:py-2 rounded text-white hover:bg-[#665081] ">Signup</button></Link>
                    </div>
              )
             :
             (
                <Popover >
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.photo  || "https://th.bing.com/th?q=User+Placeholder+Dummy&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"}
                      className="h-6 w-6 md:h-8 md:w-8 rounded-full object-cover"
                    ></AvatarImage>
                    
                    
                  </Avatar>
                </PopoverTrigger>
                
                <PopoverContent className="max-w-100 my-2 md:my-5 bg-gray-200 rounded-xl mx-3 p-2 w-50 md:w-75 z-10">
                  <div className="flex gap-2 md:gap-4  ">
                    <Avatar className="cursor-pointer  flex-shrink-0">
                      <AvatarImage
              
                        src={user?.profile?.photo||"https://th.bing.com/th?q=User+Placeholder+Dummy&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"}
                        className="h-6 w-6 md:h-8 md:w-8 rounded-full object-cover "
                     
                      ></AvatarImage>
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="font-semibold  md:font-medium">{user?.fullname} </h4>
                      <p className="text-xs md:text-sm  break-words">
                       {user.profile.bio}
                      </p>
                    </div>
                  </div>
    
                  <div className="flex-col my-1 md:my-2">
                        {
                          user && user.role=='student'?   (          
                      <div className="flex gap-4 md:gap-2 items-center "><User2 className="max-sm:w-4"/><Button  variant="link" className='max-sm:text-xs max-sm:p-0 max-sm:h-4  '> <Link to="/profile">View Profile</Link></Button></div>
                          ):<></>
                        }
                       
                        <div className="flex gap-4 md:gap-2 items-center " onClick={LogoutHandler}> <LogOut className="max-sm:w-4"/><Button className='max-sm:text-xs max-sm:h-4 max-sm:p-0'  variant="link">Logout</Button></div>
                    </div>
                </PopoverContent>
              </Popover>
             )
           }
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
