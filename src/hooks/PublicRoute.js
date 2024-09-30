import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "./use/useAuth";
export const PublicRoute = (props) => {
  const { children } = props;
  const auth = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (auth.isAuthenticated) {
        router.replace("/home");
      } else {
        setIsVerified(true);
      }
    }
  }, [auth.isAuthenticated, router, isMounted]);
  return isVerified ? <>{children}</> : null;
};
