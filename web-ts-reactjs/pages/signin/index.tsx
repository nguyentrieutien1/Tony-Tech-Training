import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../constants/apiUrl";
import { saveToLocalStorage } from "../../utils/storage";
import Link from "next/link";
import { UserDTO } from "@/types/user.type";
import AuthForm from "@/components/AuthForm/AuthForm";
import { AuthApi } from "@/apis/auth.api";

export const authFields = [
  {
    name: "email",
    type: "email",
    lable: "Email",
  },
  {
    name: "password",
    type: "password",
    lable: "Password",
  },
];
export default function SignIn() {
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
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const result = await AuthApi.signIn(user);
    const { status, message } = result;
    const { data } = result;
    if (status === 201) {
      saveToLocalStorage("accessToken", data?.accessToken);
      router.push("/");
    } else {
      alert(message);
    }
  };
  return (
    <AuthForm
      fields={authFields}
      onSubmit={handleSignIn}
      handleChange={handleChange}
      user={user}
      title="Sign In"
    />
  );
}
