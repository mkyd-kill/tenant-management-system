import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page | Homr Management System",
  description: "",
};

export default function SignUp() {
  return <SignUpForm />;
}
