"use client";

import React from "react";
import { sidebarLinks } from "@/constants/constants";
import { SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
const LeftBar = () => {
  const path = usePathname();

  return (
    <section className="background-light900_dark200 max-lg:hidden min-w-[300px] w-[20%]">
      <div className="flex flex-col text-light-900 gap-4 items-center">
        {sidebarLinks.map((item) => {
          let isActive =
            path == item.route ||
            (path.includes(item.route) && item.route.length > 1);
          return (
            <Link
              key={item.label}
              className={` invert dark:invert-0 p-3 w-3/4  text-md rounded-xl flex gap-3 justify-start ${
                path == item.route &&
                "primary-gradient invert-0 text-lg font-bold "
              } `}
              href={item.route}
            >
              {" "}
              <Image
                alt="lable"
                src={item.imgURL}
                width={20}
                height={20}
              ></Image>{" "}
              {item.label}{" "}
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="auth flex flex-col items-center gap-6 ">
          <Link className="min-w-full flex justify-center" href="/sign-in">
            <button
              className=" min-w-[80%]   dark:bg-slate-500 text-sm border-none text-primary-500  bg-slate-600  
        rounded-md p-2  "
            >
              Login
            </button>
          </Link>
          <Link className="min-w-full flex justify-center" href="/sign-in">
            <button className="min-w-[80%]   dark:bg-neutral-600 bg-sky-100 text-dark-100 dark:text-light-900 text-sm border-none rounded-md p-2  ">
              Register
            </button>
          </Link>
        </div>
      </SignedOut>
</section>
  );
};

export default LeftBar;
