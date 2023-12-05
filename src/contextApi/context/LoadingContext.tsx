"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";
import loading from "../../assets/loading.gif";

interface LoadingContextProps {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextProps>({
    isLoading: true,
    setIsLoading: () => { }
});

export function LoadingProvider(props: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {props.children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext;