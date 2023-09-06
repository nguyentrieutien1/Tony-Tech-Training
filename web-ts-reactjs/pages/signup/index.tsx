import React, { FormEvent, useState } from "react";
import { UserDTO } from "@/types/user.type";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm/AuthForm";
import { authFields } from "../signin";
import { AuthApi } from "@/apis/auth.api";
export default function SignUp() {


  const router = useRouter();


  const handleSignUp = async (e: FormEvent, user: UserDTO) => {
    e.preventDefault();
    try {
      const data = await AuthApi.signUp(user);
      const { status } = data;
      if (status === 201) {
        router.push("/signin");
      } else {
        console.log(data);
      }
    } catch (error: any) {
      console.log(error);

      const { message } = error?.response?.data;
      alert(message);
    }
  };

  
  return (
    <AuthForm fields={authFields} onSubmit={handleSignUp} title="Sign Up" />
  );
}
