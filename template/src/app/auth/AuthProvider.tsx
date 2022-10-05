import React from "react";
import {useRefreshMutation} from "../../store/auth/auth.api";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [refresh, {isUninitialized, isSuccess, isError, ...data}] = useRefreshMutation()

    React.useEffect(() => {
        const refresh_token = localStorage.getItem('refresh')
        if (refresh_token) {
            refresh(refresh_token)
        }
    }, [])

    console.log({isUninitialized, data})

    if (!isSuccess && !isError) {
        return <h1>Loading!</h1>
    }

    return <>{children}</>
}
