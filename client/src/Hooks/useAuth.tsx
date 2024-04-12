import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import axios from './useAxios';

interface RegisterData {
    firstName: string;
    middleName: string;
    lastName: string;
    suffixName: string;
    contact: string;
    email: string;
    password: string;
    role: string;
}

interface LoginData {
    email: string;
    password: string;
}

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const handleInputErrors = (data: LoginData): boolean => {
        const { email, password } = data;

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return false;
        }
        return true;
    };

    const login = async (data: LoginData) => {
        const { email, password } = data;

        const success = handleInputErrors({email, password});
        if (!success) return;

        setLoading(true);

        try {
            await axios
                .post(`/auth/login`, data)
                .then((response: any) => {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    setAuthUser(response.data);
                    navigate('/profile');
                });

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            await axios
                .post(`/auth/logout`)
                .then((response: any) => {
                    console.log(response.data)
                    localStorage.removeItem("user");
                    setAuthUser(null);
                });
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

const useRegister = () => {
    const { login } = useLogin(); 
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const handleInputErrors = (data: RegisterData): boolean => {
        const { firstName, lastName, contact, email, password} = data;
        
        if (!firstName || !lastName || !contact || !email || !password) {
            toast.error("Please fill in all fields");
            return false;
        }

        return true;
    };

    const register = async (data: RegisterData) => {
        if (!handleInputErrors(data)) {
            return; // Exit early if there are input errors
        }

        setLoading(true);

        try {
            await axios.post(`/auth/register`, data).then((response: any) => {
                // Login user after successful registration
                login({ email: data.email, password: data.password });
                localStorage.setItem("user", JSON.stringify(response.data));
                setAuthUser(response.data);
            });

        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, register };
};


export { useLogin, useLogout, useRegister };