import { model, Schema } from "mongoose";
import { ParticipantDetails } from "../../helpers/subModels/participantDetails.js";

const sessionReservationSchema = new Schema(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: "Session", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    guestsCount: { type: Number, default: 1 },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    participantDetails: ParticipantDetails,
  },

  { timestamps: true },
);

sessionReservationSchema.index({ sessionId: 1, status: 1 });
sessionReservationSchema.index({ userId: 1 });
sessionReservationSchema.index({ expiresAt: 1 });

const SessionReservation = model(
  "sessionReservation",
  sessionReservationSchema,
);
export default SessionReservation;
