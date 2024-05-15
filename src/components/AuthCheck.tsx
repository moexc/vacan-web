import { PropsWithChildren, ReactNode, useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../store";

const AuthCheck = ({ children, auth, path }: PropsWithChildren<{children: ReactNode, auth?: boolean, path: string}>) => {
    const authStore = useSelector((state: IRootState) => state.authStore);
    const navigate = useNavigate();
    useEffect(() => {
        if(auth == undefined || auth == true){
            if(authStore.logined !== '1'){
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