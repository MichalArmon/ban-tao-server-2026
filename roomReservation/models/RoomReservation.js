import { model, Schema } from "mongoose";
import { ExtraPreferences } from "../../helpers/subModels/extraPreferences.js";

const roomReservationSchema = new Schema(
  {
    roomId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guestsCount: { type: Number },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    extraPreferences: ExtraPreferences,
  },

  { timestamps: true },
);

const RoomReservation = model("RoomReservation", roomReservationSchema);
export default RoomReservation;
