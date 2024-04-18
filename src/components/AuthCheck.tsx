import { PropsWithChildren, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const AuthCheck = ({ children, auth, path }: PropsWithChildren<{children: ReactNode, auth?: boolean, path: string}>) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(auth == undefined || auth == true){
            if(!localStorage.getItem('token')){
                navigate('/auth/login')
            }
        }
    },[path])
    
    return (
        <>
            {children}
        </>
    )
}

export default AuthCheck