import { Schema } from "mongoose";

export const ParticipantDetails = new Schema(
  {
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    goals: [{ type: String }],
    injuriesNotes: { type: String, trim: true },
    extras: [{ type: String }],
    instructorNotes: { type: String, trim: true },
  },
  { _id: false },
);
