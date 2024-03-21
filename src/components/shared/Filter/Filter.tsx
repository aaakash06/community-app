import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import Tag from "../TagComponent/Tag";

const FilterDropDown = ({ items }: { items: string[] }) => {

  return (<>
  <div className="md:hidden text-dark-300 poppins dark:text-light-900 flex items-center  ">

<Select >
  <SelectTrigger className="w-[180px] background-light800_dark300 h-full border-hidden rounded-lg max-sm:min-w-full max-sm:p-4 ">
    <SelectValue className=" " placeholder="Select a Filter " />
  </SelectTrigger>
  <SelectContent className=" background-light800_dark300 dark:text-light-900">
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={item} value={item}>
          {" "}
          {item}{" "}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
</div>

<div className="flex gap-7 mt-7 max-md:hidden ">
{items.map((item) => (
        <Tag  key={item} item={item} rounded="md" otherStyle="p-2 text-[12px]"/>
      
      ))}


</div>

</>

  );
};

export default FilterDropDown;
