import React, { createContext, useState, useEffect, useContext } from 'react';
import {useNavigate, Outlet, Navigate} from 'react-router-dom';
import axios from './useAxios';

interface AuthContextState {
    user: any;
    login: (data: LoginData) => void;
    logout: () => void;
    register: (data: RegisterData) => void;
    isAuth: (id: any) => boolean;
}

interface RegisterData {
    first: string;
    middle: string;
    last: string;
    contact: number;
    email: string;
    password: string;
    role: string;
  }

interface LoginData {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextState>({
    user: null,
    login: () => {},
    logout: () => {},
    register: () => {},
    isAuth: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null);

    const login = async (data: LoginData) => {
        const { email, password} = data;
        try{
            await axios
            .post(`/auth/login`,{
                "email" : email,
                "password" : password
            })
            .then((response: any) => {
                console.log(response.data)
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate("/profile")
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    const register = async (data: RegisterData) => {
      const { first, middle, last, contact, email, password, role } = data;

      try{
          await axios
          .post(`/auth/register`,{
              firstName: first,
              middleName: middle,
              lastName: last,
              contact: contact,
              credentials: {
                email: email,
                password: password,
              },
              role: role,
          })
          .then((response: any) => {
              console.log(response)
              setUser(response.data.user);
              localStorage.setItem('user', JSON.stringify(response.data.user))
              navigate("/dashboard")
          });
      }
      catch (error: any){
          console.log(error);
          alert(error.message);
      }
    };

    const logout = async () => {
        await axios.post(`/auth/logout`)
        localStorage.clear();
        navigate("/");
    };

    const isAuth = (id:any) => {
		if (!user) {
			// User is not logged in, so they are not authorized
			return false;
		}

		// User is logged in and authorized
		return true;
	};

    useEffect(() => {
        // Check if user is already logged in on first mount
        // const loggedInUser = localStorage.getItem("user");
        // if (loggedInUser) {
        //     setUser(JSON.parse(loggedInUser));
        // }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register, isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}


interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {

  // * Gets locally stored user
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';
  const type = user.type

  return (
    
    // Checks if user exists
    user
      // Checks if allowed roles are defined
      ? allowedRoles 
          // Checks if user type is part of allowed roles
          ? allowedRoles?.includes(type)
              ? <Outlet/>
              // Redirects to forbidden if user is not allowed
              : <Navigate to="/forbidden"/>
          : <Outlet/>   
      // Redirects to login if not logged in
      : <Navigate to="/login"/>
  );
};