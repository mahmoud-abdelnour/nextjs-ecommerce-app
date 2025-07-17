'use client';

import "../public/assets/css/styles.css";
import Header from "./_layout/header/Header";
import Footer from "./_layout/footer/footer";
import { WishlistProvider } from "./_context/WishlistContext";
import MobileHeader from "./_layout/header/MobileHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./_context/Provider";
import { ToastContainer } from "react-toastify";
import { useContext } from 'react';
import { GlobalContext } from '@/app/_context/GlobalContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { drawerOpen, toggleDrawer, closeDrawer } = useContext(GlobalContext);
  
  return (

    <html lang="en">
    <body className={`${drawerOpen ? "mobile-menu-active" : ""}`}>
        {drawerOpen && <div className="body-overlay-1" onClick={closeDrawer}></div>}
      <ToastContainer />
      <Header />
      <MobileHeader />
      {children}
          <Footer />
      </body>
    </html>

  );
}