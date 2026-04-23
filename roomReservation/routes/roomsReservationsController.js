import express from "express";

import {
  createRoomReservationService,
  updateRoomReservationService,
  getAllRoomReservationsService,
  getOneByIdService,
} from "../services/roomReservationService.js";

const roomReservationRouter = express.Router();

// ✔️✔️READ✔️✔️
roomReservationRouter.get("/", async (req, res) => {
  try {
    const RoomReservations = await getAllRoomReservationsService();
    res.status(200).send(RoomReservations);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️GET one by ID✔️✔️

roomReservationRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const roomReservation = await getOneByIdService(id);
    res.status(200).send(roomReservation);
  } catch (error) {
    res.status(404).send("Room Reservation not found!");
  }
});

// ✔️✔️CREATE✔️✔️
roomReservationRouter.post("/", async (req, res) => {
  const newRoomReservation = req.body;
  try {
    const newRoomReservationForMongo =
      await createRoomReservationService(newRoomReservation);

    res.status(201).send(newRoomReservationForMongo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// ✔️✔️UPDATE✔️✔️

roomReservationRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedRoomReservation = await updateRoomReservationService(
      id,
      payload,
    );
    res.status(200).send(updatedRoomReservation);
  } catch (error) {
    console.log(error);
  }
});

export default roomReservationRouter;
