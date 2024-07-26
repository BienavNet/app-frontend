import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
// import { useLocation, useNavigate } from "react-router-dom";
import { useRouter } from "expo-router";

export const Authenticated = (props) => {
  const { children } = props;
  const auth = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push("/");
    } else {
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, router]);

  if (!isVerified) {
    return null;
  }

  return <>{children}</>;
};
