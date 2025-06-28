import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "./Redux/jobSlice";
const categ = [
  {
    cat: "Location",
    val: ["New Delhi", "Dubai", "Banglore", "Hydrabad", "Pune"],
  },
  {
    cat: "Industry",
    val: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    cat: "Salary",
    val: ["0-40k", "42-1Lakh", "1Lakh-5Lakh"],
  },
];
export default function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full">
      <h1 className="text-[10px] md:text-xl">Filter Jobs</h1>
      <hr className="mt-2 md:mt-3" />

      {categ.map((val, idx) => (
        <div className="mt-4">
          <h1 className=" mb-2 md:mb-4 font-bold text-xs md:text-xl">{val.cat}</h1>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {val.val.map((item, index) => {
              const itemId = `id${idx}-${index}`;
              return (
                <div className="flex gap-2 items-center">
                  <RadioGroupItem id={itemId} value={item} className='max-sm:h-2 max-sm:w-2'/>
                  <Label htmlFor={itemId} className='text-[8px] md:text-xs'>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}
