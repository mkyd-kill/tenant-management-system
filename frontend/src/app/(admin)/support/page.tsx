import { Metadata } from "next";
import ProtectedRoute from "@/server/ProtectedRoute";

export const metadata: Metadata = {
    title:
      "Homr System Dashboard",
    description: "",
  };

export default function Support() {
    return (
        <ProtectedRoute>
          <h2>Support page coming soon...</h2>
        </ProtectedRoute>
    )
}