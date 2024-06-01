"use client";
import React, { useState } from "react";
import Image from "next/image";
import GlobalResult from "./GlobalResult";
const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="w-[610px] gap-3 rounded-lg max-lg:hidden flex items-center background-light800_dark300 py-4 shadow-light-200 dark:shadow-none  ">
        <Image
          className="ml-2"
          alt="searchIcon"
          src="/assets/icons/search.svg"
          width={20}
          height={20}
        ></Image>
        <input
          type="text"
          className="flex-1 dark:text-white text-sm placeholder:text-sm border-none outline-none  h-full bg-transparent"
          placeholder="Global Search"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
