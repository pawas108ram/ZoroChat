import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { pusherServer } from '@/app/libs/pusher';

export async function POST(request: Request) {
    try {
        
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { userId, isGroup, members, name } = body;
        if (!currentUser?.email || !currentUser.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data was provided ', { status: 400 });
        }
        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => (
                                {id:member.value}
                            )),
                            {
                                id:currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users:true
                }
            })

            newConversation.users.forEach((user) => {
                if (user.email) {
                    pusherServer.trigger(user.email, 'conversation:new', newConversation);
                }
            })
            return NextResponse.json(newConversation);
        }

        const existing = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals:[currentUser.id,userId]
                        }
                    },
                    {
                        userIds: {
                           equals:[userId,currentUser.id]
                       } 
                    }
                ]
            }
        })

        //checking both as the conversation may be initiated from any side and the order does not matter then as a conversation already exists than

        const singleConversation = existing[0];
        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newSingleConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id:userId
                        },
                        {
                           id:currentUser.id 
                        }
                    ]
                }
            },
            include: {
                users:true
            }
        })

        newSingleConversation.users.map((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:new', newSingleConversation);
            }
        })
        return NextResponse.json(newSingleConversation);
        
    }
    catch (error: any) {
        
        return new NextResponse('Internal Error', { status: 500 });
        
    }
}