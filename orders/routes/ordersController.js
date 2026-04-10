import express from "express";

import {
  createOrderService,
  deleteOrderService,
  getAllOrdersService,
  getOneByIdService,
  updateOrderService,
} from "../services/ordersService.js";
import Order from "../models/Order.js";

const OrderRouter = express.Router();

// ✔️✔️READ✔️✔️
OrderRouter.get("/", async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️CREATE✔️✔️
OrderRouter.post("/", async (req, res) => {
  const newOrder = req.body;
  try {
    const newOrderForMongo = await createOrderService(newOrder);

    res.status(201).send(newOrderForMongo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// ✔️✔️GET one by ID✔️✔️

OrderRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await getOneByIdService(id);
    res.status(200).send(order);
  } catch (error) {
    res.status(404).send("Card not found!");
  }
});

// ✔️✔️UPDATE✔️✔️

OrderRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedOrder = await updateOrderService(id, payload);
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️DELETE✔️✔️
OrderRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteOrderService(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
});

export default OrderRouter;
