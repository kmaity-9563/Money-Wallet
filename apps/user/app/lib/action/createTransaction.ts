"use server"
import { getServerSession } from 'next-auth'
import authOptions from '../auth'
import db from '@repo/prisma/client'


export const createTransaction = async (amount: number, provider: string) => {
    const session = await getServerSession(authOptions)
    const token : any = Math.random()
    const userId = await session.userId
    console.log(`createTransaction`)
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
        
    }),

    console.log(db.onRampTransaction.fields.amount)
    return {
        message : 'created transaction'
       
    }
}


