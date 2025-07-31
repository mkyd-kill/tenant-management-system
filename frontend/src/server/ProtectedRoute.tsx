"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/UserAuthContext";

export default function ProtectedRoute ({ children }: { children: React.ReactNode }) {
    const [checked, setChecked] = useState(false);
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push("/signin");
            toast.warning("Authentication Required");
        } else {
            setChecked(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return checked ? <>{ children }</> : null;
}