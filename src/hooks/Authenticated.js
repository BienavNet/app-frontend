import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter, usePathname} from "expo-router";
import Loading from "../../components/share/loading";

export const Authenticated = ({children}) => {
  const { isAuthenticated } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
   const router = useRouter();
//    const pathname = usePathname();
//   const [isVerified, setIsVerified] = useState(false);
//  console.log(pathname, "pathname autenticated")
 
  useEffect(() => {
      if (!isAuthenticated) {
        console.log(pathname, "pathname autenticated entro a /")
        router.replace('/');
      } else {
        setIsVerified(true);
      }
    
  }, [isAuthenticated]);


  return isVerified ? <>{children}</> :null;
};
