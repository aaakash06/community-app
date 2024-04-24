"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import Tag from "../TagComponent/Tag";
import { useRouter, useSearchParams } from "next/navigation";
import { changeQuery, removeQuery } from "@/lib/utils";

const FilterDropDown = ({
  items,
  tags,

}: {
  items: string[];
  tags?: boolean;

}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  function clickHandler(value: string) {
    value = value.toLocaleLowerCase();
    const newUrl = changeQuery(searchParams.toString(), "filter", value);
    router.push(newUrl); 
  }

  if (tags) {
    return (
      <>
        <div className="md:hidden  text-dark-300 poppins max-sm:text-sm dark:text-light-900 flex items-center ">
          <Select>
            <SelectTrigger className="w-[180px] X max-sm:w-[90px] background-light800_dark300 h-full border-hidden rounded-lg max-sm:min-w-full max-sm:p-4  ">
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
      </>
    );
  } else {
    return (
      <>
        <div className=" text-dark-300 poppins dark:text-light-900   ">
          <Select onValueChange={clickHandler}>
            <SelectTrigger className="w-[180px] border-none  background-light800_dark300 h-full rounded-md max-sm:w-[200px] max-sm:h-[30px] max-sm:p-5 p-3">
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
      </>
    );
  }
};

export default FilterDropDown;
