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
    <section className="background-light900_dark200  light-border custom-scrollbar overflow-y-auto sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col text-light-900  gap-5 items-center">
        {sidebarLinks.map((item) => {
          let isActive =
            path == item.route ||
            (path.includes(item.route) && item.route.length > 1);
          return (
            <Link
              key={item.label}
              className={`  invert dark:invert-0 p-2 w-[90%]  text-md rounded-lg flex gap-3 justify-start ${
                isActive
                  ? "primary-gradient invert-0 text-lg font-bold spaceGrotesk"
                  : "font-extralight poppins "
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
              <p className="max-lg:hidden">{item.label}</p>{" "}
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="auth flex flex-col items-center gap-6 ">
          <Link className="min-w-full  flex justify-center" href="/sign-in">
            <button
              className=" min-w-[80%]  bg-zinc-400 text-sm font-bold border-none text-primary-500  dark:bg-slate-600  
        rounded-md p-2  "
            >
              <Image
                alt="account"
                className="invert lg:hidden dark:invert-0"
                src="/assets/icons/account.svg"
                width={20}
                height={20}
              />
              <p className="max-lg:hidden"> Login </p>
            </button>
          </Link>
          <Link className="min-w-full flex  justify-center" href="/sign-up">
            <button className="min-w-[80%]   dark:bg-neutral-600 bg-sky-100 text-dark-100 dark:text-light-900 text-sm border-none rounded-md p-2  ">
              <Image
                alt="sign-up"
                className="invert lg:hidden dark:invert-0"
                src="/assets/icons/sign-up.svg"
                width={25}
                height={25}
              />
              <p className="max-lg:hidden"> Register </p>
            </button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftBar;
