"use client"

import React from 'react'
import { useRouter ,usePathname } from 'next/navigation'

interface SidebarItemProps  {
    href : string,
    title : string
    icon : React.ReactNode
}

const SidebarItem = ({href,title,icon} : SidebarItemProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const select = pathname === href

  return (
    <div className={`flex pt-4  pl-8 ${select ? "text-[#6a51a6]" : "text-slate-500 cursor-pointer "}`} 
    onClick={() => {  router.push(href) ;
        console.log(href)
    }}>
        
        <div className=''>{icon}</div>
        <div className={`font-bold ml-2 ${select ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
  )
}

export default SidebarItem
