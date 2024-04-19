"use server"
import { getServerSession } from 'next-auth'
import authOptions from '../auth'
import db from '@repo/prisma/client'


export const createTransaction = async (amount: number, provider: string) => {
    const session = await getServerSession(authOptions)
    const token : string = Math.random().toString()
    console.log("session", session)
    const userId =  Number(session.user.id)
    console.log(`userId: ${userId}`)
    if (!userId) {
        return {
            message: 'please login to create'
        }
    }
    await db.onRampTransaction.create({
        data: {
            userId: userId,
            amount: amount,
            provider: provider,
            status: "processing",
            startTime : new Date,
            token : token ,
        }
    });

         return {
        message : 'created transaction'
       
    }
}


