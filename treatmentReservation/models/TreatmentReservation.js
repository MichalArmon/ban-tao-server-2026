import { model, Schema } from "mongoose";

const treatmentReservationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },

    treatmentId: {
      type: Schema.Types.ObjectId,
      ref: "Treatment",
      required: true,
    },

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
  },
  { timestamps: true },
);

const TreatmentReservation = model(
  "TreatmentReservation",
  treatmentReservationSchema,
);
export default TreatmentReservation;
