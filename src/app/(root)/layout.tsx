import RightBar from "@/components/SideBar/RightBar";
import LeftBar from "@/components/shared/Leftbar";
import NavBar from "@/components/shared/NavBar/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative ">
      <NavBar></NavBar>

      <div className="flex-between ">
        <LeftBar />
        <section className="min-h-screen   pt-36  flex-1 flex-col px-6 pb-6   ">
          <div className="mx-auto w-full lg:px-[5%] max-lg:pl-[5%] max-sm:px-[4%]">{children} </div>
        </section>

     
        <RightBar />
      </div>
    </main>
  );
};

export default Layout;
