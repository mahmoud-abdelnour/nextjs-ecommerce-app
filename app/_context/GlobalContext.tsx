
import React, { useState, useMemo, createContext, Dispatch, SetStateAction, ReactNode,useEffect } from "react";
import { setToken } from "@/app/_services/httpServices";
import { useSession } from "next-auth/react";

// Define the context type
interface GlobalContextType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  handleChangePage: (p: number) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  drawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

// create context with default values
export const GlobalContext = createContext<GlobalContextType>({
  currentPage: 1,
  setCurrentPage: () => {},
  handleChangePage: () => {},
  isLoading: false,
  setIsLoading: () => {},

  drawerOpen: false,
  toggleDrawer: () => {},
  closeDrawer: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session, status } = useSession() as { data: SessionWithToken | null; status: string };

  interface SessionUserWithToken {
    name?: string | null;
    email?: string | null;
    token?: string;
  }

  interface SessionWithToken {
    user?: SessionUserWithToken;
    [key: string]: any;
  }


  const toggleDrawer = () => {
    setDrawerOpen(drawerOpen => !drawerOpen);

  };


  const closeDrawer = () => setDrawerOpen(false);
  

  const handleChangePage = (p:any) => {
    setCurrentPage(p);
  };

  const value = useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      handleChangePage,
      isLoading,
      setIsLoading,


      drawerOpen,
      toggleDrawer,
      closeDrawer,
    }),
    [ currentPage, isLoading,drawerOpen]
  );

    useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setToken(session.user.token);
    } else if (status === "unauthenticated") {
      setToken(null);
    }
  }, [session, status]);
  

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
