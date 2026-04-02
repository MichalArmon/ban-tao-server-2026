import express from "express";

import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getOneByIdService,
  updateUserService,
} from "../services/UsersService.js";
import { loginService } from "../services/usersService.js";

const userRouter = express.Router();

// ✔️✔️READ✔️✔️
userRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️CREATE✔️✔️
userRouter.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const newUserForMongo = await createUserService(newUser);

    res.status(201).send(newUserForMongo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});
// ✔️✔️LOGIN✔️✔️
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email, password);

    res.status(200).send(user);
  } catch (error) {
    res.status(401).json({ message: "email or password are not correct" });
  }
});

// ✔️✔️GET one by ID✔️✔️

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getOneByIdService(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send("Card not found!");
  }
});

// ✔️✔️UPDATE✔️✔️

userRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedUser = await updateUserService(id, payload);
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️DELETE✔️✔️
userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserService(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
});

export default userRouter;
