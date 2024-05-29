import React, { createContext, useContext, ReactNode } from "react";
import {create} from 'zustand';

interface AuthUser {
    userId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    credentials: {
        email: string;
        password: string;
    };
    contact: number;
    isAdmin?: boolean;
    photo?: string;
    description?: string;
    license?: string;
}

interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: (newAuthUser: AuthUser | null) => void;
}

const useAuthStore = create<AuthContextType>((set) => ({
    authUser: localStorage.getItem('chat-user')
        ? JSON.parse(localStorage.getItem('chat-user')!)
        : null,
    setAuthUser: (newAuthUser: AuthUser | null) => {
        set({ authUser: newAuthUser });
        localStorage.setItem('chat-user', JSON.stringify(newAuthUser));
    },
}));

const AuthContext = createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => {},
});

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {
    return (
        <AuthContext.Provider value={useAuthStore()}>
            {children}
        </AuthContext.Provider>
    );
};