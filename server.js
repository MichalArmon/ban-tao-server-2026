import "dotenv/config";

import express from "express";
import uploadsRoutes from "./cloudinary/routes/uploadsRoutes.js";
import roomRouter from "./rooms/routes/roomsController.js";
import { connectToDB } from "./DB/dbService.js";
import treatmentRouter from "./treatments/routes/treatmentsController.js";
import cors from "cors";
import workshopRouter from "./workshops/routes/workshopsController.js";
import userRouter from "./users/routes/userController.js";
import roomReservationRouter from "./roomReservation/routes/roomsReservationsController.js";
import orderRouter from "./orders/routes/ordersController.js";
import sessionRouter from "./sessions/routes/sessionsController.js";
import recurringRuleRouter from "./recurringRules/routes/recurringRulesController.js";
import sessionReservationRouter from "./sessionReservation/routes/sessionReservationController.js";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/uploads", uploadsRoutes);
app.use("/rooms", roomRouter);
app.use("/treatments", treatmentRouter);
app.use("/workshops", workshopRouter);
app.use("/room-reservations", roomReservationRouter);
app.use("/workshop-reservations", sessionReservationRouter);
app.use("/orders", orderRouter);
app.use("/workshop-sessions", sessionRouter);

app.use("/recurring-rules", recurringRuleRouter);

app.listen(port, () => {
  console.log(`Listing to port ${port}!`);
  connectToDB();
});
