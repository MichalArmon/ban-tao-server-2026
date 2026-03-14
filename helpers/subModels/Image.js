import { Schema } from "mongoose";

export const Image = new Schema(
  {
    publicId: { type: String, required: false },
    url: { type: String, required: false },
    alt: { type: String, default: "" },
    width: Number,
    height: Number,
    format: String,
  },
  { _id: false },
);
