import express from "express";

import {
  createWorkshopService,
  deleteWorkshopService,
  getAllWorkshopsService,
  getOneByIdService,
  updateWorkshopService,
} from "../services/workshopsService.js";

const workshopRouter = express.Router();

// ✔️✔️READ✔️✔️
workshopRouter.get("/", async (req, res) => {
  try {
    const workshops = await getAllWorkshopsService();
    res.status(200).send(workshops);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️CREATE✔️✔️
workshopRouter.post("/", async (req, res) => {
  const newWorkshop = req.body;
  try {
    const newWorkshopForMongo = await createWorkshopService(newWorkshop);

    res.status(201).send(newWorkshopForMongo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// ✔️✔️GET one by ID✔️✔️

workshopRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const workshop = await getOneByIdService(id);
    res.status(200).send(workshop);
  } catch (error) {
    res.status(404).send("Card not found!");
  }
});

// ✔️✔️UPDATE✔️✔️

workshopRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedWorkshop = await updateWorkshopService(id, payload);
    res.status(200).send(updatedWorkshop);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️DELETE✔️✔️
workshopRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteWorkshopService(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
});

export default workshopRouter;
