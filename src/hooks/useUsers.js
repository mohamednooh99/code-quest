import { useState, useEffect } from "react";
import { userApi } from "../services/api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userApi.getUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        console.log("err fetching all users", err.message);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Create user
  const createUser = async (userData) => {
    try {
      const newUser = await userApi.createUser(userData);
      setUsers((prev) => [newUser, ...prev]);
      return { success: true, user: newUser };
    } catch (err) {
      console.log("err create new user", err.message);

      return { success: false, error: err.message };
    }
  };

  // Update user
  const updateUser = async (userId, userData) => {
    try {
      const updatedUser = await userApi.updateUser(userId, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );
      return { success: true, user: updatedUser };
    } catch (err) {
      console.log("err update user", err.message);
      return { success: false, error: err.message };
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      await userApi.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      return { success: true };
    } catch (err) {
      console.log("err delete user", err.message);

      return { success: false, error: err.message };
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
};
