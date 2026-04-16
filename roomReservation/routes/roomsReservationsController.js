import express from "express";
import RoomReservation from "../models/RoomReservation.js";

const roomReservationRouter = express.Router();

// ✔️✔️CREATE✔️✔️
roomReservationRouter.post("/", async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, guestsCount, userId } = req.body;
    if (!roomId || !checkIn || !checkOut || !guestsCount) {
      return res
        .status(400)
        .send("details are missing to create a reservation");
    }
    const expiresInMinutes = 10;
    const newReservation = new RoomReservation({
      roomId: roomId,
      userId: userId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guestsCount: guestsCount,
      status: "pending",
      expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
    });
    await newReservation.save();

    res.status(201).json({
      message: "Room reservation created successfully!",
      reservation: newReservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).send("Server error - failed to create reservation");
  }
});

export default roomReservationRouter;
