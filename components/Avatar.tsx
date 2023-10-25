'use client'

import useActiveList from "@/app/hooks/useActiveList";
import { User } from "@prisma/client"
import Image from "next/image";
import clsx from 'clsx'

interface AvatarProps{
    user?: User;
}


const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
      <div className="relative">
          <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:w-11 md:h-11   ">
              <Image alt="Avatar" src={user?.image || '/images/placeholder.png'} fill />
              
      </div>
      
          <span className={clsx(`absolute block rounded-full  ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3`,isActive?'bg-green-500':'bg-gray-400')}></span>
      
    </div>
  )
}

export default Avatar
