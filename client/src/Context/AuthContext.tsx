import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthUser {
    _id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    credentials: {
        email: string;
        password: string;
    };
    contact: number;
    photo?: string;
    host?: {
        id: string;
        name: string;
        photo: string;
    };
}

interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
        const storedUser = localStorage.getItem("chat-user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
