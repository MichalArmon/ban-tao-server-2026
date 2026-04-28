import express from "express";

import {
  createTreatmentReservationService,
  deleteTreatmentReservationService,
  getAllTreatmentReservationsService,
  getOneByIdService,
  updateTreatmentReservationService,
} from "../services/treatmentReservationsService.js";

const treatmentReservationRouter = express.Router();

// ✔️✔️READ✔️✔️
treatmentReservationRouter.get("/", async (req, res) => {
  try {
    const treatmentReservations = await getAllTreatmentReservationsService();
    res.status(200).send(treatmentReservations);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️CREATE✔️✔️
treatmentReservationRouter.post("/", async (req, res) => {
  const newTreatmentReservation = req.body;
  try {
    const newTreatmentReservationForMongo =
      await createTreatmentReservationService(newTreatmentReservation);

    res.status(201).send(newTreatmentReservationForMongo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// ✔️✔️AVAILABILITY✔️✔️

// treatmentReservationRouter.get("/availability", async (req, res) => {
//   try {
//     const { guestsCount, treatmentReservationType, checkIn, checkOut } =
//       req.query;

//     let TreatmentReservationFilter = {};
//     if (TreatmentReservationType && TreatmentReservationType !== "All") {
//       TreatmentReservationFilter.TreatmentReservationType =
//         TreatmentReservationType;
//     }
//     // $gte=greater then or equal
//     if (guestsCount) {
//       TreatmentReservationFilter.maxGuests = { $gte: Number(guestsCount) };
//     }
//     if (checkIn && checkOut) {
//       const now = new Date();
//       const start = new Date(checkIn);
//       const end = new Date(checkOut);
//       const busyReservations = await TreatmentReservationReservation.find({
//         status: { $in: ["pending", "confirmed"] },
//         $or: [{ status: "confirmed" }, { expiresAt: { $gt: now } }],
//         checkIn: { $lt: end },
//         checkOut: { $gt: start },
//       });
//       const busyTreatmentReservationIds = busyReservations.map(
//         (res) => res.TreatmentReservationId,
//       );
//       TreatmentReservationFilter._id = { $nin: busyTreatmentReservationIds };
//     }

//     console.log(
//       "The filter object looks like this:",
//       TreatmentReservationFilter,
//     );

//     const availableTreatmentReservations = await TreatmentReservation.find(
//       TreatmentReservationFilter,
//     );
//     if (!availableTreatmentReservations.length) {
//       res.status(404).send("No available TreatmentReservations to show!");
//     }
//     res.status(200).send(availableTreatmentReservations);
//   } catch (error) {
//     console.log("Error in searchAvailableTreatmentReservations:", error);
//     res.status(500).send("Server Error");
//   }
// });

// ✔️✔️GET one by ID✔️✔️

treatmentReservationRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const treatmentReservation = await getOneByIdService(id);
    res.status(200).send(treatmentReservation);
  } catch (error) {
    res.status(404).send("Card not found!");
  }
});

// ✔️✔️UPDATE✔️✔️

treatmentReservationRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedTreatmentReservation = await updateTreatmentReservationService(
      id,
      payload,
    );
    res.status(200).send(updatedTreatmentReservation);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️DELETE✔️✔️
treatmentReservationRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTreatmentReservationService(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
});

export default treatmentReservationRouter;
