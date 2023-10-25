import getConversaionById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/components/EmptyState';
import React from 'react'
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';
interface IParams {
    conversationId: string;
}

const ConversationPage = async ({ params }: { params: IParams }) => {
    const conversation = await getConversaionById(params.conversationId);
    const messages = await getMessages(params.conversationId);
    

    if (!conversation) {
        return (
            <div className='lg:pl-80 h-full'>
                <div className='flex flex-col h-full'>
                    <EmptyState/>
                </div>
            </div>
        )
    }
  return (
    <div className='lg:pl-80 h-full'>
          <div className='h-full flex flex-col'>
              <Header conversation={conversation} />
              <Body initialMessages={messages} />
              <Form/>
      </div>
    </div>
  )
}

export default ConversationPage
