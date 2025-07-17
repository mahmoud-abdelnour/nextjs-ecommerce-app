"use client"; 

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WishlistProvider } from "./WishlistContext";
import { CartProvider } from "react-use-cart";
import { SessionProvider } from "next-auth/react";
import { GlobalProvider } from "./GlobalContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <GlobalProvider>
            <CartProvider>
                <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
          </GlobalProvider>
        </SessionProvider>
    </QueryClientProvider>
  );
}