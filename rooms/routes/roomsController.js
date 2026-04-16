import express from "express";

import {
  createRoomService,
  deleteRoomService,
  getAllRoomsService,
  getOneByIdService,
  updateRoomService,
} from "../services/roomsService.js";
import Room from "../models/Room.js";
import RoomReservation from "../../roomReservation/models/RoomReservation.js";

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

// ✔️✔️AVAILABILITY✔️✔️

roomRouter.get("/availability", async (req, res) => {
  try {
    const { guestsCount, roomType, checkIn, checkOut } = req.query;

    let roomFilter = {};
    if (roomType && roomType !== "All") {
      roomFilter.roomType = roomType;
    }
    // $gte=greater then or equal
    if (guestsCount) {
      roomFilter.maxGuests = { $gte: Number(guestsCount) };
    }
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const busyReservations = await RoomReservation.find({
        status: { $in: ["pending", "confirmed"] },
        $or: [{ status: "confirmed" }, { expiresAt: { $gt: now } }],
        checkIn: { $lt: end },
        checkOut: { $gt: start },
      });
      const busyRoomIds = busyReservations.map((res) => res.roomId);
      roomFilter._id = { $nin: busyRoomIds };
    }

    console.log("The filter object looks like this:", roomFilter);

    const availableRooms = await Room.find(roomFilter);
    if (!availableRooms.length) {
      res.status(404).send("No available rooms to show!");
    }
    res.status(200).send(availableRooms);
  } catch (error) {
    console.log("Error in searchAvailableRooms:", error);
    res.status(500).send("Server Error");
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

export default roomRouter;
