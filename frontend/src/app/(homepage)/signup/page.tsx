import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page",
  description: "",
};

export default function SignUp() {
  return <SignUpForm />;
}
