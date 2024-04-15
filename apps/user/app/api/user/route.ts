import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import authOptions from '../../lib/auth'

export const GET = async () => {
    try {
    const session = await getServerSession(authOptions)
    if(session?.user) {
       return  NextResponse.json({
        user : session.user
       })
    }
    } catch (err) {
    return NextResponse.json({
        message : "you are not logedin. Please login"
    } , { status: 401}
        )
    }
}