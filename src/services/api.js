// API service for user management
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Helper function to simulate API delay
const simulateApiCall = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Simulated API response:", data);
      resolve(data);
    }, delay);
  });
};

export const userApi = {
  // Fetch all users
  getUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      console.log("Users fetched successfully:", users);
      return users;
    } catch (error) {
      console.error("Error in getUsers:", error.message);
      throw error;
    }
  },

  // Create a new user (simulated)
  createUser: async (userData) => {
    const newUser = {
      id: Date.now(), // Simulated unique ID
      ...userData,
      username: userData.name?.toLowerCase().replace(/\s+/g, "") || "",
      website: "",
      company: { name: "" },
      address: { city: "", street: "", suite: "", zipcode: "" },
    };
    return simulateApiCall(newUser);
  },

  // Update an existing user (simulated)
  updateUser: async (userId, userData) => {
    const updatedUser = {
      id: userId,
      ...userData,
      username: userData.name?.toLowerCase().replace(/\s+/g, "") || "",
      website: "",
      company: { name: "" },
      address: { city: "", street: "", suite: "", zipcode: "" },
    };
    return simulateApiCall(updatedUser);
  },

  // Delete a user (simulated)
  deleteUser: async (userId) => {
    const result = { success: true, id: userId };
    return simulateApiCall(result);
  },
};
