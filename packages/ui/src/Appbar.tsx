


interface AppbarProps {
    user? : {
        name? : string | null
    },
    onSignin? : () => void ,
    onSignout? : () => void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout 
} : AppbarProps ) => {
        return (
            <div className="flex border-b justify-between px-4 border-slate-400">
                <div className="text-lg flex flex-col justify-center">Money Wallet</div>
                <div  className="flex flex-col justify-center pt-2"
                onClick={user ? onSignout : onSignin } >{user ? "logout" :" logino"}</div>
            </div>
        )
}