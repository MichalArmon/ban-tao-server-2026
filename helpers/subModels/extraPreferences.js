import { Schema } from "mongoose";

export const ExtraPreferences = new Schema(
  {
    mealPlan: {
      type: String,
      enum: ["Breakfast only", "Half board", "Full board"],
      default: "Breakfast only",
    },
    rentScooter: {
      type: Boolean,
      default: false,
    },
    shuttleFromFerry: {
      type: Boolean,
      default: false,
    },
    specialRequests: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);
