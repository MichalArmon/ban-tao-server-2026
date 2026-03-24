import express from "express";
import {
  createTreatmentService,
  deleteTreatmentService,
  getAllTreatmentsService,
  getOneByIdService,
  updateTreatmentService,
} from "../services/treatmentsService.js";

const treatmentRouter = express.Router();

// ✔️✔️READ✔️✔️
treatmentRouter.get("/", async (req, res) => {
  try {
    const treatments = await getAllTreatmentsService();
    res.status(200).send(treatments);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️CREATE✔️✔️
treatmentRouter.post("/", async (req, res) => {
  const newTreatment = req.body;
  try {
    const newTreatmentForMongo = await createTreatmentService(newTreatment);

    res.status(201).send(newTreatmentForMongo);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// ✔️✔️GET one by ID✔️✔️

treatmentRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const Treatment = await getOneByIdService(id);
    res.status(200).send(Treatment);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// ✔️✔️UPDATE✔️✔️

treatmentRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedTreatment = await updateTreatmentService(id, payload);
    res.status(200).send(updatedTreatment);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️DELETE✔️✔️
treatmentRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTreatmentService(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
});

export default treatmentRouter;
