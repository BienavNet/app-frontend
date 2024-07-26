import React, {useEffect, useState} from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from 'expo-router';

export const PublicRoute = (props) => {
    const {children }= props;
    const auth = useAuth();
    const [isVerified, setIsVerified] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        if(auth.isAuthenticated){
            router.push('/home');
        } else {
            setIsVerified(true);
        }
    }, [auth.isAuthenticated, router])
    
    if(!isVerified){
        return null
    }

    return (
        <>
            {children}
        </>
    )
}