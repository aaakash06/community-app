"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { changeQuery, removeQuery } from "@/lib/utils";
const SearchBar = ({ route }: { route?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  useEffect(() => {
    const debounceTimeOut = setTimeout(() => {
      if (search) {
        const newUrl = changeQuery(searchParams.toString(), "q", search);
        router.push(newUrl, { scroll: false });
      } else {
        router.push(route!, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(debounceTimeOut);
  }, [search, query, router, route]);

  return (
    <div className=" w-full gap-3 rounded-lg flex items-center background-light800_dark300 py-4 shadow-sm dark:shadow-none ">
      <Image
        className="ml-2"
        alt="searchIcon"
        src="/assets/icons/search.svg"
        width={20}
        height={20}
      />
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        className="flex-1 dark:placeholder:text-slate-700 text-sm placeholder:text-sm border-none outline-none  h-full bg-transparent text-dark100_light900"
        placeholder="Global Search"
      />
    </div>
  );
};

export default SearchBar;
