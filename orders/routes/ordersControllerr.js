import express from "express";
import Order from "../models/Order.js";
import RoomReservation from "../../roomReservation/models/RoomReservation.js";

const orderRouter = express.Router();

// ✔️✔️ CREATE NEW ORDER ✔️✔️

orderRouter.post("/", async (req, res) => {
  const orderData = req.body;

  try {
    // 1. יוצר את ההזמנה (זה עובד)
    const newOrder = await Order.create(orderData);

    // 2. התיקון: לגשת ל-ID שנמצא בתוך המערך
    const reservationId = orderData.roomReservations[0];

    if (reservationId) {
      await RoomReservation.findByIdAndUpdate(reservationId, {
        status: "confirmed",
      });
    }

    // 3. מחזיר הצלחה
    res.status(201).send(newOrder);
  } catch (error) {
    console.log("Error in Server:", error.message);
    res.status(400).send(error.message); // שלחי את ה-error האמיתי כדי שתראי מה קרה
  }
});

export default orderRouter;
