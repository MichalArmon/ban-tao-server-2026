import express from "express";

import {
  createRecurringRuleService,
  deleteRecurringRuleService,
  getAllRecurringRulesService,
  getOneByIdService,
  updateRecurringRuleService,
} from "../services/recurringRulesService.js";

const recurringRuleRouter = express.Router();

// ✔️✔️READ✔️✔️
recurringRuleRouter.get("/", async (req, res) => {
  try {
    const recurringRules = await getAllRecurringRulesService();
    res.status(200).send(recurringRules);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️CREATE✔️✔️
recurringRuleRouter.post("/", async (req, res) => {
  const newRecurringRule = req.body;
  try {
    const newRecurringRuleForMongo =
      await createRecurringRuleService(newRecurringRule);

    res.status(201).send(newRecurringRuleForMongo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// ✔️✔️GET one by ID✔️✔️

recurringRuleRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recurringRule = await getOneByIdService(id);
    res.status(200).send(recurringRule);
  } catch (error) {
    res.status(404).send("Card not found!");
  }
});

// ✔️✔️UPDATE✔️✔️

recurringRuleRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedRecurringRule = await updateRecurringRuleService(id, payload);
    res.status(200).send(updatedRecurringRule);
  } catch (error) {
    res.status(500).send(error.message || "Internal Server Error");
    console.log(error);
  }
});

// ✔️✔️DELETE✔️✔️
recurringRuleRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRecurringRuleService(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
});

export default recurringRuleRouter;
