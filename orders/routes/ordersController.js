import express from "express";
import Order from "../models/Order.js";
import RoomReservation from "../../roomReservation/models/RoomReservation.js";

const orderRouter = express.Router();

// ✔️✔️ CREATE NEW ORDER ✔️✔️
orderRouter.post("/", async (req, res) => {
  const orderData = req.body;

  try {
    const newOrder = await Order.create(orderData);

    await RoomReservation.findByIdAndUpdate(orderData.roomReservationId, {
      status: "confirmed",
    });

    res.status(201).send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send("Could not create order");
  }
});

export default orderRouter;
