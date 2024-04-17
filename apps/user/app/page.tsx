"use server"
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '../app/lib/auth'


export default async function page(){
  const session = await getServerSession(authOptions)
  console.log(session, 'session')
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
}