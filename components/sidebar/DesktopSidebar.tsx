'use client'
import { useState } from "react";

import useRoutes from "@/app/hooks/useRoutes"
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";

interface DesktopSideBarProps{
  currentUser:User
}


const DesktopSidebar:React.FC<DesktopSideBarProps> = ({currentUser}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={()=>setIsOpen(false)}  />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-auto lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((ele) => {
             return <DesktopItem key={ele.label}
                href={ele.href}
                label={ele.label}
                icon={ele.icon}
                active={ele.active}
                onClick={ele.onClick} />
            })}
          </ul>
        </nav>
        <nav
          className="
        mt-4
        flex
        flex-col
        justify-between
        items-center
        ">
          <div onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition">
            <Avatar user={currentUser}/>
          </div>
        </nav>
      
      </div>
    </>
  )
}

export default DesktopSidebar
