import ProtectedRoute from "@/server/ProtectedRoute";

export default function Property() {
    return (
        <ProtectedRoute>
            <h3 className="text-white">Coming soon...</h3>
        </ProtectedRoute>
    )
}