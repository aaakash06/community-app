import LeftBar from '@/components/shared/Leftbar'
import NavBar from '@/components/shared/navbar'
import React from 'react'



const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <main className='relative background-light850_dark100 flex flex-col dark:text-white '>
<NavBar></NavBar>

<div className='flex-between '>

<LeftBar></LeftBar>

<section className='min-h-screen bg-red-900 flex-1 flex-col px-6 pb-6 pt-36  '> 

<div className='mx-auto w-full '>

  {children}
</div>

</section>


rightbar


</div>


    </main>
  )
}

export default Layout