"use client";

import { AuthProvider } from "@/contextApi/context/AuthContext";
import { LoadingProvider } from "@/contextApi/context/LoadingContext";
import { MenuProvider } from "@/contextApi/context/MenuContext";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <LoadingProvider>
            <AuthProvider>
                <MenuProvider>
                    {children}
                </MenuProvider>
            </AuthProvider>
        </LoadingProvider>
    )
}