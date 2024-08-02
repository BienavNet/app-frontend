import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { usePathname, useRouter } from "expo-router";
import Loading from "../../components/share/loading";
export const PublicRoute = (props) => {
  const {children } = props;
  const auth = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (auth.isAuthenticated) {
        console.log(pathname, "pathname public route entro a home");
        router.replace("/home");
      } else {
        setIsVerified(true);
      }
    }
  }, [auth.isAuthenticated, isMounted, router]);

  return isVerified ? <>{children}</> : null;
};