import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter, usePathname} from "expo-router";
import Loading from "../../components/share/loading";

export const Authenticated = (props) => {
  const { children } = props;
  const auth = useAuth();
   const router = useRouter();
   const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);
 console.log(pathname, "pathname autenticated")
 
  useEffect(() => {
      if (!auth.isAuthenticated) {
        console.log(pathname, "pathname autenticated entro a /")
        router.replace('/');
      } else {
        setIsVerified(true);
      }
    
  }, [auth.isAuthenticated, router]);


  return isVerified ? <>{children}</> :null;
};