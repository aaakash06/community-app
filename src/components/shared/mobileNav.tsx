"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { sidebarLinks } from "@/constants/constants";
import { usePathname } from "next/navigation";


const NavContent=()=>{

  const path = usePathname();


return(  <div className="flex flex-col text-light-900 gap-4 mt-10">
{sidebarLinks.map((item) => {

let isActive = ( path==item.route || ( path.includes(item.route) && item.route.length > 1 )  )
  return (
   <SheetClose key={item.label} asChild>
      
      <Link 
        className={` invert dark:invert-0 p-3 text-md rounded-xl flex gap-3 justify-start ${
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
      </SheetClose>
  );
})}
</div>)

}

const MobileNav = () => {
  
  return (
    <div className="mobileNav flex items-center lg:hidden">
      <Sheet>
        <SheetTrigger className="text-3xl   " asChild>
          <Image
            alt="humburder"
            className="invert dark:invert-0"
            src="/assets/icons/hamburger.svg"
            width={23}
            height={23}
          ></Image>
        </SheetTrigger>
        <SheetContent   side={"left"}
          className="dark:bg-dark-200 bg-light-900 border-none">
       
       
        
   
          <Link href="/" className="flex gap-4  items-center">
            <Image
              className="invert-color"
              alt="humburder"
              src="/assets/images/site-logo.svg"
              width={23}
              height={23}
            ></Image>
            <p className="h2-bold text-dark-100 dark:text-light-900 spaceGrotesk ">
              AK <span className=" text-primary-500">Dev</span>{" "}
            </p>
          </Link>

          <div>
      
          <SheetClose asChild>
            
          <NavContent></NavContent>
          </SheetClose>

          <SignedOut>
            <SheetClose asChild>
              <div className="auth flex flex-col items-center gap-6 mt-10 ">
                <Link href="/sign-in">
                  <button
                    className=" dark:bg-slate-500 text-sm border-none text-primary-500  bg-slate-600  
                  w-[310px] rounded-md p-2  "
                  >
                    Login
                  </button>
                </Link>
                <Link href="/sign-in">
                  <button className="dark:bg-neutral-600 bg-sky-100 text-dark-100 dark:text-light-900 text-sm w-[310px] border-none rounded-md p-2  ">
                    Register
                  </button>
                </Link>
              </div>
            </SheetClose>
          </SignedOut>


        
</div>
       
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
