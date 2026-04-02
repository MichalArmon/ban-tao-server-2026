import User from "../models/User.js";

// 📊📊get all📊📊
export const getAllUsers = async () => {
  try {
    const users = await User.find().lean();
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by id📊📊
export const getOneById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by email📊📊
export const getOneByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

// 📊📊create📊📊
export const createUser = async (newUser) => {
  try {
    const newUserForDb = new User(newUser);
    await newUserForDb.save();
    return newUserForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊update📊📊
export const updateUser = async (id, payload) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊delete📊📊
export const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
