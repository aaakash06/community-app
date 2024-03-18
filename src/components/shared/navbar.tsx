import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import MobileNav from "./mobileNav";
import Theme from "./theme";
import GlobalSearch from "./Gloabalsearch";

const NavBar = () => {
  return (
    <nav className="min-h-20 flex fixed z-100 w-full gap-5 shadow-light-300 dark:shadow-none background-light900_dark200 p-6 sm:px-12">
      <Link href="/" className="flex gap-2 items-center">
        <Image alt="logo" src="/assets/images/site-logo.svg" width={23} height={50}></Image>
        <p className="h2-bold text-dark-100 dark:text-light-900 spaceGrotesk max-sm:hidden">
          AK <span className=" text-primary-500">Dev</span>{" "}
        </p>
      </Link>
    <GlobalSearch></GlobalSearch> 
      <div className="flex-between gap-5">
     <Theme></Theme>
        <SignedIn >
        
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#FF7000",
              },
            }}
          ></UserButton>
        </SignedIn>
      </div>
    
   <MobileNav></MobileNav>

    </nav>
  );
};

export default NavBar;
