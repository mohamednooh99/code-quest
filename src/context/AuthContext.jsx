import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data (in real app, this would come from API)
      const mockUser = {
        id: 1,
        email,
        username: email.split("@")[0],
        name: name,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const register = async (username, email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data (in real app, this would come from API)
      const mockUser = {
        id: Date.now(),
        email,
        username,
        name: username,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
