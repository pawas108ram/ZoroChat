'use client'

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./MobileItem";


const MobileFooter = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();
    if (isOpen) {
        return null;
    }
  return (
      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
          {routes.map((ele) => (
              <MobileItem key={ele.href} href={ele.href} icon={ele.icon} label={ele.label} active={ele.active} onClick={ele.onClick}   />
          ))}
      
    </div>
  )
}

export default MobileFooter
