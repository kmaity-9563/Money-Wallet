"use server"
import React from 'react'
import AddMoneyCard from '../../../components/AddMoneyCard'
import { BalanceCard } from '../../../components/BalanceCard'
import { getServerSession } from 'next-auth'
import authOptions from '../../lib/auth'
import db from '@repo/prisma/client'
import OnRampTransaction from '../../../components/OnRampTransaction'



const getAmount = async () =>{
  const session = await getServerSession(authOptions)
  const user  = Number(session?.user?.id) ;
  console.log("session ",user)
        const balance = await db.balance.findFirst({
              where: {
                userId : user
              } 
        })
        return {
          amount : balance?.amount,
          locked : balance?.locked
        }
}

const onRamptrans = async () =>{
  const session = await getServerSession(authOptions)
  const user  = Number(session?.user?.id) ;
  const trans = await db.onRampTransaction.findMany({
    where : {
        userId : user
    }
  } )
  return trans.map((txs) => ({
    time : txs.startTime,
    amount : txs.amount,

  }))
}

const page = async () => {
  const balance = await getAmount()
  const transaction = await onRamptrans()
  return (
    <div>
      <div className='my-9 text-4xl f  text-[#6a51a6]  font-bold' >
        <div>
       
          Transfer
        </div>
      </div>
      <div className='flex p-4'>
        <div className='ml-10'>
        <AddMoneyCard />
        </div>
      <div className='ml-10 flex'>
      {balance && (
        <div >
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
          )}

        <div className='ml-10'> 
            <OnRampTransaction transaction={transaction} />
        </div>
      </div>
      </div>
    </div>
  )
}

export default page
