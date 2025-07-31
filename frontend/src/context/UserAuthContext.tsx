/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { UserProfile } from "@/type/model";
import { loginAPI, registerAPI } from "@/services/authAPI";
import { jwtDecode } from "jwt-decode";
import api from "@/server/api";

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
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const access: any = localStorage.getItem("token-access");

      try {
        const decode: any = jwtDecode(access);
        const now = Math.floor(Date.now() / 1000);

        if (decode.exp > now) {
          const res = await api.get(
            "/auth/users/me",
            {
              headers: {
                "Authorization": `Bearer ${access}`,
              }
            }
          )
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch {
        localStorage.setItem("token-access", "");
      } finally {
        setIsReady(true);
      }
    }
    loadUser();
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

      if (res.status === 200) {
        // set tokens to storage
        localStorage.setItem("token-access", res.data.access);

        router.push("profile");
        toast.success("Login Successfull");
      } else {
        toast.error("Invalid Login Credentials");
      }
    } catch {
      toast.error("Network Error");
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
