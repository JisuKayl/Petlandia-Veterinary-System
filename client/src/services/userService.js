import axiosInstance from "./axiosInstance";

export const getUserProfile = async (userId = null) => {
  try {
    const response = await axiosInstance.get(
      userId ? `/users/id/${userId}` : "/profile"
    );
    return {
      ...response.data,
      isAdmin: response.data.role === "Admin",
      isStaff: response.data.role === "Staff",
      isClient: response.data.role === "Client",
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getFullName = (user) => {
  if (user && user.firstName && user.lastName) {
    const fullName = `${user.firstName} ${user.lastName}`;
    return toTitleCase(fullName);
  }
  return "";
};

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getUsersByRole = async (role) => {
  try {
    const response = await axiosInstance.get(`/users/role/${role}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/id/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
