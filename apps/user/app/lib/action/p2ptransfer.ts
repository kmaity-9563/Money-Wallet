"use server"
import { getServerSession } from 'next-auth'
import authOptions from '../auth'
import db from '@repo/prisma/client'

export async function p2ptransfer(TO: string, amount: number){
    const session = await getServerSession(authOptions)
    const FROMID = session?.user.id
    console.log("amount", amount)
    console.log("from", FROMID)

    if (!FROMID) {
        return {
            message: "error during sending to server"
        }
    }
    console.log("to", TO)

    const toUser = await db.user.findUnique({
        where: {
            number : TO
        }
    })
    console.log("to id", toUser?.id)
    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await db.$transaction(async (tx) => {
        console.log("hey 1")
        const fromBalace = await tx.balance.findUnique({
            where: {
                userId: Number(FROMID)
            }
        })
        console.log("from balace", fromBalace)

        // if (!fromBalace) {
        //     await db.balance.create({
        //         data: {
        //             userId: FROM,
        //             amount: 0
        //         }
        //     })
        // }
        if (!fromBalace || fromBalace.amount < amount) {
            return {
                message: "Balance insifficient"
            }
        }
        console.log("hey 2")
        console.log("FROM", FROMID)
        console.log("FROM", amount)
       
        await tx.balance.update({
            where: {
                userId: Number(FROMID)
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        })
        console.log("hey 3")
        console.log("Number(to)", toUser?.id)
        console.log("Number(amount)", amount)
        await tx.balance.update({
            where: {
                userId: toUser?.id
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        })
        
        console.log("hey 4")
        console.log("amount: " + amount)
        console.log("from", FROMID)
        console.log("to", toUser.id)
        const date = new Date
        console.log("date: " + date)
        await tx.p2ptransfer.create({
            data: {
                amount,
                timestamp: new Date,
                from: Number(FROMID),
                to: toUser.id
            }
        })
        console.log("Number(id)", Number(toUser.id))
        console.log("Number(FROM)", Number(FROMID))
        console.log("Number(amount)", Number(amount))
        console.log("hey 5")
    })
}

export default p2ptransfer;
