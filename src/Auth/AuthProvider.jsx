import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const STATIC_LOGIN_CREDENTIALS = {
    username: "admin",
    password: "password"
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (username, password) => {
        if (username === STATIC_LOGIN_CREDENTIALS.username && password === STATIC_LOGIN_CREDENTIALS.password) {
            const user = { username };
            setUser(user);
            return true; 
        }
        return false; 
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
