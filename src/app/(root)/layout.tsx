import NavBar from '@/components/shared/navbar'
import React from 'react'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <main className='relative background-light850_dark100 flex flex-col text-white '>
<NavBar></NavBar>

<div className='flex-between '>

leftbar

<section className='min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 '> 

<div className='mx-auto w-full max-w-5xl'>

  {children}
</div>

</section>


rightbar


</div>


    </main>
  )
}

export default Layout