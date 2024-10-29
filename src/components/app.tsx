"use client"

import { getLocalStorageItem } from "@/libs/core";
import { createContext, useContext, useEffect, useState } from "react";

// Context is a way to manage state globally.
const Context = createContext<any>(null)

export default function AppContext(props: any) {
    useEffect(() => {
        // Load application context from storage
        setWalletAddress(getLocalStorageItem("walletAddress", ""))
    }, [])

    // List of state that need to be use globally
    const [walletAddress, setWalletAddress] = useState<string>("")
    const [contractType, setContractType] = useState<string>("ZTP20")

    // Set value for context
    const contextValue = {
        walletAddress,
        setWalletAddress,
        contractType,
        setContractType
    }

    return (
        <Context.Provider value={contextValue}>
            <div className="min-h-screen">{props.children}</div>
        </Context.Provider>
    );
}

export function useAppContext() {
    return useContext(Context)
}