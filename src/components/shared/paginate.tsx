"use client";
import page from "@/app/(root)/(Home)/page";
import { changeQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Paginate = ({ route, noPage }: { route: string; noPage: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
useEffect(()=>{
  const newUrl  = changeQuery(searchParams.toString(),'page', page.toString()); 
  // console.log(newUrl)
  router.push(newUrl); 
},[page])
// console.log(page)
  function handlePage(type: string) {
    if (type == "prev") setPage((page) => page - 1);
    else setPage((page) => page + 1);
    // console.log(page)
// const newUrl  = changeQuery(searchParams.toString(),'page', (page).toString());
// console.log(newUrl);  
// router.push(newUrl);
  }

  return (
    <div className="mt-10 flex justify-center gap-2 text-sm dark:text-white">
      <button
        disabled={page == 1}
        className="bg-light-700 cursor-pointer dark:bg-dark-300 px-3 py-1 rounded-sm border-1 "
        onClick={() => {
          handlePage("prev");
        }}
      >
        {" "}
        Prev{" "}
      </button>
      <span className="px-4 rounded-md py-1  primary-gradient text-white"> {page}</span>
      <button
        disabled={page == noPage}
        className="bg-light-700 cursor-pointer dark:bg-dark-300 px-3 py-1 rounded-sm border-1  "
        onClick={() => {
          handlePage("next");
        }}
      >
        {" "}
        Next{" "}
      </button>
    </div>
  );
};

export default Paginate;
