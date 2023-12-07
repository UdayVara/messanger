"use client"
import React from 'react'
import Minibar from './Minibar'
import Userbar from './Userbar'
import { usePathname } from 'next/navigation'
function Destopbars() {
  const path = usePathname()
  return (
    <div className=' md:flex-row flex-col flex'>
        <Minibar />
        <Userbar all={path==="/users"?true:false} />
    </div>
  )
}

export default Destopbars