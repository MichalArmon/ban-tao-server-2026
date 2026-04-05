import express from "express";

import {
  createRoomService,
  deleteRoomService,
  getAllRoomsService,
  getOneByIdService,
  updateRoomService,
} from "../services/roomsService.js";

const roomRouter = express.Router();

// ✔️✔️READ✔️✔️
roomRouter.get("/", async (req, res) => {
  try {
    const rooms = await getAllRoomsService();
    res.status(200).send(rooms);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️CREATE✔️✔️
roomRouter.post("/", async (req, res) => {
  const newRoom = req.body;
  try {
    const newRoomForMongo = await createRoomService(newRoom);

    res.status(201).send(newRoomForMongo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// ✔️✔️GET one by ID✔️✔️

roomRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const room = await getOneByIdService(id);
    res.status(200).send(room);
  } catch (error) {
    res.status(404).send("Card not found!");
  }
});

// ✔️✔️UPDATE✔️✔️

roomRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedRoom = await updateRoomService(id, payload);
    res.status(200).send(updatedRoom);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️DELETE✔️✔️
roomRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRoomService(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️AVAILABILITY✔️✔️
const checkRoomAvailability = (req, res) => {
  const { checkIn, checkOut } = req.query;
  if (!checkIn || !checkOut) {
    return res
      .status(400)
      .send("Please provide both checkIn and checkOut dates");
  }
};

export default roomRouter;
