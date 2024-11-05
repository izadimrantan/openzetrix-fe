"use client";

import { getLocalStorageItem } from "@/libs/core";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ReactGA from "react-ga4";

// Initialize Google Analytics with your Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; // Replace with your Measurement ID
if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
} else {
    console.error("Google Analytics initializing error.")
}

const Context = createContext<any>(null);

export default function AppContext(props: any) {
  const pathname = usePathname();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [contractType, setContractType] = useState<string>("ZTP20");

  useEffect(() => {
    // Load application context from storage
    setWalletAddress(getLocalStorageItem("walletAddress", ""));

    // Track page view on pathname change
    if (pathname) {
      ReactGA.send({ hitType: "pageview", page: pathname });
    }
  }, [pathname]);

  // Set value for context
  const contextValue = {
    walletAddress,
    setWalletAddress,
    contractType,
    setContractType,
  };

  return (
    <Context.Provider value={contextValue}>
      <div className="min-h-screen">{props.children}</div>
    </Context.Provider>
  );
}

export function useAppContext() {
  return useContext(Context);
}
