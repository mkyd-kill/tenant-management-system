import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../api/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

// user contex type
type UserContextType = {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (user && accessToken && refreshToken) {
      setUser(JSON.parse(user));
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      navigate("/dashboard");
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(username, email, password)
      .then((res) => {
        if (res) {
          toast.success("Registration Successfull!");
          navigate("/login");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("accessToken", res?.data.access);
          localStorage.setItem("refreshToken", res?.data.refresh);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setAccessToken(res?.data.access);
          setUser(userObj!)
          toast.success("Login Successfull!");
          navigate("/dashboard");
        } else {
          toast.error("Invalid Login Credentials");
        }
      })
      .catch((e) => toast.error("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    setAccessToken("");
    toast.success("Logout Successfull!");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, accessToken, refreshToken, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
