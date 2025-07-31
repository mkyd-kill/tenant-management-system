import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserAuthContext';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <UserProvider>
          <ThemeProvider>
            <SidebarProvider>
              <ToastContainer autoClose={2000} />
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
