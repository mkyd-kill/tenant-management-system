import { ToastContainer } from "react-toastify";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/homepage/navbar/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-2 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <Navbar />
        <div className="mt-3 relative flex lg:flex-row w-full flex-col dark:bg-gray-900 sm:p-0">
          <ToastContainer autoClose={2000} />
          {children}
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}