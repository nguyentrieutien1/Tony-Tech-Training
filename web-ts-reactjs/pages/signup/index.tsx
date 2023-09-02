import React, { FormEvent, useState } from "react";
import { UserDTO } from "@/types/user.type";
import { API_URL } from "../../constants/apiUrl";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm/AuthForm";
import { authFields } from "../signin";
import { AuthApi } from "@/apis/auth.api";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState<UserDTO>({ email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value, name } = target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSignUp = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const data = await AuthApi.signUp(user);
      const { status } = data;
      console.log(data);

      if (status === 201) {
        router.push("/signin");
      }
    } catch (error: any) {
      const { message } = error.response.data;
      alert(message);
    }
  };
  return (
    <AuthForm
      fields={authFields}
      onSubmit={handleSignUp}
      handleChange={handleChange}
      user={user}
      title="Sign Up"
    />
  );
}
