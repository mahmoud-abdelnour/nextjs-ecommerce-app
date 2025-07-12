
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define Wishlist Item Type
export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
  slug?: string;
}

// Define Context Type
interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  clearWishlist: () => void;
}

// Create Context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Provider Component
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const wishlistCount = wishlist.length; 

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const addToWishlist = (item: WishlistItem) => {
    if (!wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      const updatedWishlist = [...wishlist, item];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const removeFromWishlist = (itemId: string) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistCount, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to access wishlist
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}