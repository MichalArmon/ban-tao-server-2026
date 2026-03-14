import mongoose from "mongoose";

export const connectToDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/resort_2026")
    .then(() => console.log("connected to mongo locally"))
    .catch((error) => `could not connect to mongoDb:${error}`);
};
