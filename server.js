import express from "express";
import uploadsRoutes from "./cloudinary/routes/uploadsRoutes.js";
import roomRouter from "./rooms/routes/roomsController.js";
import { connectToDB } from "./DB/dbService.js";
import treatmentRouter from "./treatments/routes/treatmentsController.js";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.use("/uploads", uploadsRoutes);
app.use("/rooms", roomRouter);
app.use("/treatments", treatmentRouter);

app.listen(port, () => {
  console.log(`Listing to port ${port}!`);
  connectToDB();
});
