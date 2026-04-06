import { generateToken } from "../../auth/providers/jwtProvider.js";
import { generatePassword, comparePassword } from "../../bcrypt.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneById,
  getOneByEmail,
  updateUser,
} from "./usersDataService.js";

// 💼💼get all💼💼
export const getAllUsersService = async () => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneByIdService = async (id) => {
  try {
    const user = await getOneById(id);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 💼💼register💼💼
export const createUserService = async (newUser) => {
  try {
    const newUserPlusBcryptPassword = {
      ...newUser,
      password: generatePassword(newUser.password),
    };
    const newUserForController = await createUser(newUserPlusBcryptPassword);
    return newUserForController;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼login💼💼

export const loginService = async (email, password) => {
  const user = await getOneByEmail(email);
  if (comparePassword(password, user?.password)) {
    const token = generateToken(user);
    return { user, token };
  }
};

// 💼💼update💼💼
export const updateUserService = async (id, payload) => {
  try {
    const updatedUser = await updateUser(id, payload);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼delete💼💼
export const deleteUserService = async (id) => {
  try {
    await deleteUser(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
