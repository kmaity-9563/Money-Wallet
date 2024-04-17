"use client"
import { signIn, signOut, useSession  } from 'next-auth/react'
import React from 'react'
import { Appbar } from "@repo/ui/appbar"
import { useRouter } from 'next/navigation'

const AppbarComponent = () => {

  const { data: session } = useSession(); 
  const router = useRouter()
  const user  = session?.user?.name || undefined;
  // console.log("appbar", session?.user?.id )
  console.log("appbar", user)
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={
        async () => {
          await signOut()
          router.push('/api/auth/signin')
        }}
        user={session?.user?.id}
      />
    </div>
  )
}

export default AppbarComponent
