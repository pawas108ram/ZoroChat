
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "./getCurrentUser";

const getConversaionById = async (converationId: string) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.email) {
            return null;
        }
        const conversation = await prisma.conversation.findUnique({
            where: {
                id:converationId
            },
            include: {
                users:true
            }
        })
        return conversation;
    }
    catch (error: any) {
        
        return null;
        
    }

}

export default getConversaionById