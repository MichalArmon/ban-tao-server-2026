import { Schema } from "mongoose";

export const TreatmentParticipantDetails = new Schema(
  {
    pressureLevels: {
      type: String,
      enum: ["Light & Relaxing", "Medium", "Firm / Deep Tissue"],
    },
    focusAreasOptions: [{ type: String }],
    medicalConditionsOptions: { type: String, trim: true },
    extraSpaOptions: [{ type: String }],
    specialRequests: { type: String, trim: true },
  },
  { _id: false },
);
