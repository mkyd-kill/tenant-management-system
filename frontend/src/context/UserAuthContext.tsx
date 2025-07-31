"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { UserProfile } from "@/type/model";
import { loginAPI, registerAPI } from "@/services/authAPI";
import { jwtDecode } from "jwt-decode";

type UserContextType = {
  user: UserProfile | null;
  registerUser: (username: string, email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("token-access");

    if (access) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decode: any = jwtDecode(access);
        const now = Math.floor(Date.now() / 1000);

        if (decode.exp > now) {
          setUser(decode.sub);
        } else {
          throw new Error("Token Expired");
        }
      } catch {
        localStorage.removeItem("token-access");
        router.push("/signin");
      }
    } else {
      router.push("/signin");
    }

    setIsReady(true);
  }, [router]);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(username, email, password);
      setUser(res.data);
      toast.success("Registration Successfull");
      router.push("/signin");
    } catch {
      toast.error("Failed to Register");
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const res = await loginAPI(email, password);
      if (res?.status === 200) {
        setAccessToken(res.data.access);

        // set tokens to storage
        localStorage.setItem("token-access", accessToken);

        router.push("profile");
        toast.success("Login Successfull");
      } else {
        toast.error("Invalid Login Credentials");
      }
    } catch {
      toast.error("Failed to Login");
    }
  };

  const logout = async () => {
    setUser(null);
    setIsReady(false);
    localStorage.removeItem("token-access");
    router.push("signin");
    toast.success("Logged Out Successfull");
  };

  const isLoggedIn = () => !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        logout,
        isLoggedIn,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);