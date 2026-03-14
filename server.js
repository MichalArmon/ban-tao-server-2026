import express from "express";
import uploadsRoutes from "./cloudinary/routes/uploadsRoutes.js";
import roomRouter from "./rooms/routes/roomsController.js";
import { connectToDB } from "./DB/dbService.js";

const app = express();
const port = 8000;
app.use(express.json());

app.use("/uploads", uploadsRoutes);
app.use("/rooms", roomRouter);

app.listen(port, () => {
  console.log(`Listing to port ${port}!`);
  connectToDB();
});
