import SideBar from '@/components/sidebar/SideBar'
import React from 'react'
import ConversationList from './components/ConversationList'
import getConversations from '../actions/getConversations'
import getUsers from '../actions/getUsers'

const ConversationLayout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
      <SideBar>
          <div className='h-full'>
              <ConversationList users={users} initialItems={conversations}/>
              {children}
          </div>
    </SideBar>
  )
}

export default ConversationLayout
