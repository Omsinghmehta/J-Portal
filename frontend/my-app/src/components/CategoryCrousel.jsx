import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "./Redux/jobSlice";
const category = [
  "Frontend",
  "Backend",
  "React",
  "Full Stack",
  "Data Science",
  "MEAN Stack",
];

const CategoryCrousal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeHandler = (query) => {
    console.log(query)
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="max-w-30 md:max-w-110 mx-auto my-5 md:my-18 ">
        <CarouselContent >
          {category.map((cat, idx) => (
            <CarouselItem
              key={idx}
              className="basis-1/2 lg:basis-1/3"
            >
              <Button onClick={() => changeHandler(cat)} className="rounded  max-md:text-[7px] ">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent >
        <CarouselPrevious className='max-sm:w-6 h-auto'/>
        <CarouselNext className='max-sm:w-6 h-auto'/>
      </Carousel>
    </div>
  );
};

export default CategoryCrousal;
