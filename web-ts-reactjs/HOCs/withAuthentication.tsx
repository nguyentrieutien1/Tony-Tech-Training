import { useEffect } from "react";
import { useRouter } from "next/router";
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
