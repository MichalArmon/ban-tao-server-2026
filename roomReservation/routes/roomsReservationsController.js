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

    const newReservation = new RoomReservation({
      roomId: roomId,
      userId: userId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guestsCount: guestsCount,
    });
    await newReservation.save();

    res.status(201).json({
      message: "ההזמנה לחדר נקלטה בהצלחה!",
      reservation: newReservation,
    });
  } catch (error) {
    console.error("שגיאה ביצירת הזמנה:", error);
    res.status(500).send("שגיאת שרת - לא הצלחנו ליצור את ההזמנה");
  }
});

export default roomReservationRouter;
