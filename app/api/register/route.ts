import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req:Request,res:Response){
    try{
        const body=await req.json();
    const {name,email,password}=body;
    if(!name || !email || !password){
        return new NextResponse('Missing Info',{status:400});
    }

    const hashedPassword=await bcrypt.hash(password,12);
    const user=await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    })

    return  NextResponse.json(user,{status:201});
    }catch(error){
        return NextResponse.json(error,{status:500})
    }
}
