import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
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

interface RegisterHostData {
    license: string;
    description: string;
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

                    if (response.data.name.first === "Admin"){
                        navigate('/admin/renters');
                        localStorage.setItem('mode', 'Admin');
                    }
                    else if (response.data.license){
                        localStorage.setItem('mode', 'Host');
                        navigate('/profile');
                    }
                    else {
                        localStorage.setItem('mode', 'Renter');
                        navigate('/profile');
                    }
                });
        } catch (error: any) {
            toast.error(error.response?.data?.message);
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
            toast.error(error.response?.data?.message);
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
    const navigate = useNavigate();

    const handleInputErrors = (data: RegisterData): boolean => {
        const { firstName, lastName, contact, email, password} = data;
        
        if (!firstName || !lastName || !contact || !email || !password) {
            toast.error("Please fill in all fields");
            return false;
        }

        return true;
    };

    const isEmailUnique = async (data): Promise<boolean> => {
        setLoading(true);

        try {
            const response = await axios.post(`/auth/checkemail`, {email: data});
            return !response.data.duplicateEmail;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            toast.error("Email already exists");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        setLoading(true);

        try {
            await axios.post(`/auth/register`, data).then((response: any) => {
                login({ email: data.email, password: data.password });
                localStorage.setItem("user", JSON.stringify(response.data));
                setAuthUser(response.data);
                navigate('/profile');
            });

        } catch (error: any) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const registerHost = async (data: RegisterHostData) => {
        setLoading(true);

        try {
            await axios.post(`/auth/register/host`, data).then((response: any) => {
                toast.success("Host registration successful");
            });
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, register, isEmailUnique, registerHost };
};

const usePasswordReset = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const forgetPassword = async (email: string) => {
        setLoading(true);

        try {
            await axios
                .post(`/user/password/forgot`, {email:email})
                .then((response: any) => {
                    toast.success("Password reset link sent to email");
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                });
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (password: string, hash: string) => {
        setLoading(true);

        console.log({
            password: password,
            hash: hash
        })

        try {
            await axios
                .post(`/user/password/reset`, {
                    password: password,
                    hash: hash
                })
                .then((response: any) => {
                    toast.success("Password reset successful");
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                });
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, forgetPassword, resetPassword };
}

const ProtectedRoute = ({ allowedRoles }) => {
    const { authUser } = useAuthContext();

    return (
        authUser
        ? allowedRoles 
            ? allowedRoles?.includes(localStorage.getItem('mode'))
                ? <Outlet/>
                : <Navigate to="/forbidden"/>
            : <Outlet/> 
        : <Navigate to="/login"/>
    );
};

export { useLogin, useLogout, useRegister, usePasswordReset, ProtectedRoute };