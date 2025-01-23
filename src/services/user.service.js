const User = require("../models/user.model"); // Fix incorrect 'user' import
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider"); // Import your custom JWT provider

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    // Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists with the provided email");
    }

    // Hash the password before saving
    password = await bcrypt.hash(password, 8);

    // Create and save the user
    const user = await User.create({ firstName, lastName, email, password });
    console.log("Created user:", user);

    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to create user");
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to find user by ID");
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to find user by email");
  }
};

const getUserProfileByToken = async (token) => {
  try {
    // Decode the token to get the user ID
    const userId = jwtProvider.getUserIdFromToken(token);

    // Find the user by ID
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("User not found with the given token");
    }

    return user; // Add a return statement for consistency
  } catch (error) {
    throw new Error(error.message || "Failed to get user profile by token");
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message || "Failed to get all users");
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers
};
