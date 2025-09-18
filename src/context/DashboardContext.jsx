import React, { createContext, useContext, useState, useEffect } from "react";
import { userApi } from "../services/api";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [originalUsers, setOriginalUsers] = useState([]);
  const [draftUsers, setDraftUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userApi.getUsers();
        setOriginalUsers(data);
        setDraftUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Add new user to draft
  const addUser = (userData) => {
    // Prevent duplicate email or username
    const emailExists = draftUsers.some((u) => u.email === userData.email);
    const usernameExists = draftUsers.some(
      (u) => u.username === userData.username
    );
    if (emailExists || usernameExists) {
      setError("A user with this email or username already exists.");
      return false;
    }
    setDraftUsers((prev) => {
      const newId = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1;
      const newUser = {
        id: newId,
        ...userData,
        username: userData.name?.toLowerCase().replace(/\s+/g, "") || "",
        website: "",
        company: { name: "" },
        address: { city: "", street: "", suite: "", zipcode: "" },
      };
      return [newUser, ...prev];
    });
    setError(null);
    return true;
  };

  const updateUser = (userId, userData) => {
    // Prevent duplicate email or username (excluding current user)
    const emailExists = draftUsers.some(
      (u) => u.id !== userId && u.email === userData.email
    );
    const usernameExists = draftUsers.some(
      (u) => u.id !== userId && u.username === userData.username
    );
    if (emailExists || usernameExists) {
      setError("A user with this email or username already exists.");
      return false;
    }
    setDraftUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, ...userData } : user))
    );
    setError(null);
    return true;
  };

  // Delete user by ID
  const deleteUser = (userId) => {
    setDraftUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // Save draft changes into original
  const saveChanges = async () => {
    try {
      // Simulate API save
      setOriginalUsers([...draftUsers]);
      return { success: true };
    } catch (error) {
      console.error("Save failed:", error);
      return { success: false, error: error.message };
    }
  };

  // Cancel changes and revert to original
  const cancelChanges = () => {
    setDraftUsers([...originalUsers]);
  };

  // Check if there are unsaved changes
  const hasUnsavedChanges = () => {
    return JSON.stringify(originalUsers) !== JSON.stringify(draftUsers);
  };

  const value = {
    originalUsers,
    draftUsers,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    saveChanges,
    cancelChanges,
    hasUnsavedChanges,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
