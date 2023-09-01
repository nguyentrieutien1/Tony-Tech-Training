import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuthentication = (WrappedComponent: any) => {
  const withAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/signin");
      }
    }, []);
    return <WrappedComponent {...props} />;
  };

  return withAuth;
};

export { withAuthentication };
