'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthContextType = {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

// auth provider -> wraps the entire app and accepts a value prop
export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storeUserToken = async () => {
            const storedToken = await localStorage.getItem("access_token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
        storeUserToken();
    }, [])

    const login = (newToken: string) => {
        localStorage.setItem("access_token", newToken);
        setToken(newToken);
        router.push("/dashboard")
    }

    const logout = () => {
        document.cookie = 'access_token=; Max-Age=0; path=/';
        localStorage.removeItem('access_token');
        setToken(null);
        router.push('/auth/login');
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return ctx;
}