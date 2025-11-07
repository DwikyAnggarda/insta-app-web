import React, { createContext, useEffect, useState } from "react";
import api from "../lib/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    const setToken = (token) => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
    };

    const register = async (payload) => {
        const res = await api.post("/register", payload);
        setToken(res.data.token);
        setUser(res.data.user);
        return res;
    };

    const login = async (email, password) => {
        const res = await api.post("/login", { email, password });
        setToken(res.data.token);
        setUser(res.data.user);
        return res;
    };

    const logout = async () => {
        try {
            await api.post("/logout");
        } catch { }
        setToken(null);
        setUser(null);
    };

    const fetchUser = async () => {
        try {
            const res = await api.get("/user");
            setUser(res.data);
        } catch {
            setUser(null);
            localStorage.removeItem("token");
        } finally {
            setLoadingAuth(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoadingAuth(false);
            return;
        }
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loadingAuth, login, register, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}
