import express from "express";

import {
  createSessionReservationService,
  updateSessionReservationService,
  getAllSessionReservationsService,
  getOneByIdService,
} from "../services/sessionReservationService.js";

const sessionReservationRouter = express.Router();

// ✔️✔️READ✔️✔️
sessionReservationRouter.get("/", async (req, res) => {
  try {
    const sessionReservations = await getAllSessionReservationsService();
    res.status(200).send(sessionReservations);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️GET one by ID✔️✔️

sessionReservationRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sessionReservation = await getOneByIdService(id);
    res.status(200).send(sessionReservation);
  } catch (error) {
    res.status(404).send("sessionReservation not found!");
  }
});

// ✔️✔️CREATE✔️✔️
sessionReservationRouter.post("/", async (req, res) => {
  const newSessionReservation = req.body;
  try {
    const newSessionReservationForMongo = await createSessionReservationService(
      newSessionReservation,
    );

    res.status(201).send(newSessionReservationForMongo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// ✔️✔️UPDATE✔️✔️

sessionReservationRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedSessionReservation = await updateSessionReservationService(
      id,
      payload,
    );
    res.status(200).send(updatedSessionReservation);
  } catch (error) {
    console.log(error);
  }
});

export default sessionReservationRouter;
