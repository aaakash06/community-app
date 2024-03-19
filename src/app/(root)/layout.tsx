import LeftBar from "@/components/shared/Leftbar";
import NavBar from "@/components/shared/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 ">

      <NavBar></NavBar>
   

      <div className='flex-between relative'>

<LeftBar/>

<section className='min-h-screen  pt-36  flex-1 flex-col px-6 pb-6   '> 

<div className='mx-auto w-full '>

  {children}
</div>

</section>


<div className="">Right</div>


</div>
    </main>
  );
};

export default Layout;
