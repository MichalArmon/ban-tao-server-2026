import express from "express";

import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getOneByIdService,
  updateUserService,
} from "../services/UsersService.js";
import { loginService } from "../services/usersService.js";
import { auth } from "../../auth/services/authService.js";

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
    const loginResult = await loginService(email, password);

    res.status(200).send(loginResult.token);
  } catch (error) {
    res.status(401).json({ message: "email or password are not correct" });
  }
});
// ✔️✔️GET MY FAVORITES ✔️✔️

userRouter.get("/my-favorites", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await getOneByIdService(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userFavorites = user.favorites || {
      rooms: [],
      treatments: [],
      workshops: [],
    };

    res.status(200).json(userFavorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Internal server error" });
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
// ✔️✔️LIKE✔️✔️

userRouter.patch("/like", auth, async (req, res) => {
  try {
    const { entityId, entityType } = req.body;

    const userId = req.user._id;

    const validTypes = ["rooms", "treatments", "workshops"];
    if (!validTypes.includes(entityType)) {
      return res
        .status(400)
        .json({ message: "Not allowed! Invalid entity type." });
    }

    const user = await getOneByIdService(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorite = user.favorites[entityType].includes(entityId);

    if (isFavorite) {
      user.favorites[entityType].pull(entityId);
    } else {
      user.favorites[entityType].push(entityId);
    }

    await user.save();

    res.status(200).json({
      message: isFavorite ? "Removed from favorites" : "Added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    // תיקון התחביר: שליחת תגובה מסודרת
    res.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;
