import express from "express";
import SessionReservation from "../models/SessionReservation.js";
import Session from "../../sessions/models/Session.js";

const sessionReservationRouter = express.Router();

// ✔️✔️CREATE✔️✔️
sessionReservationRouter.post("/", async (req, res) => {
  try {
    const { sessionId, guestsCount, userId } = req.body;
    if (!sessionId) {
      return res
        .status(400)
        .send("details are missing to create a reservation");
    }
    const expiresInMinutes = 10;
    const newReservation = new SessionReservation({
      sessionId: sessionId,
      userId: userId,

      guestsCount: guestsCount,
      status: "pending",
      expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
    });
    await newReservation.save();
    const newEnrolledUsers = { userId: userId, joinedAt: new Date() };
    await Session.findByIdAndUpdate(
      sessionId,
      {
        $push: { enrolledUsers: newEnrolledUsers },
      },
      { new: true },
    );

    res.status(201).json({
      message: "Session reservation created successfully!",
      reservation: newReservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).send("Server error - failed to create reservation");
  }
});

export default sessionReservationRouter;
