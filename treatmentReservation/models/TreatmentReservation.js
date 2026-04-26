import { model, Schema } from "mongoose";
import { TreatmentParticipantDetails } from "../../helpers/subModels/treatmentParticipantDetails.js";

const treatmentReservationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },

    treatmentId: {
      type: Schema.Types.ObjectId,
      ref: "Treatment",
      required: true,
    },
    guestsCount: { type: Number, default: 1 },

    date: { type: Date, required: true },
    startTime: { type: String, required: true },

    priceAtBooking: { type: Number, required: true },
    currency: { type: String, default: "THB" },
    durationAtBooking: { type: Number, required: true },

    medicalNotes: { type: String, default: "" },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    treatmentParticipantDetails: TreatmentParticipantDetails,
  },
  { timestamps: true },
);

const TreatmentReservation = model(
  "TreatmentReservation",
  treatmentReservationSchema,
);
export default TreatmentReservation;
