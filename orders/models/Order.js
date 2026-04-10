import { model, Schema } from "mongoose";

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    unique: true,
    default: () => `BT-${Math.floor(1000 + Math.random() * 9000)}`,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

  roomReservations: [{ type: Schema.Types.ObjectId, ref: "RoomReservation" }],
  spaReservations: [
    { type: Schema.Types.ObjectId, ref: "TreatmentReservation" },
  ],
  studioReservations: [{ type: Schema.Types.ObjectId, ref: "Workshop" }],

  totalPrice: { type: Number, required: true },
  currency: { type: String, default: "USA" },
  status: {
    type: String,
    enum: ["pending", "confirmed", "paid", "cancelled"],
    default: "confirmed",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = model("order", orderSchema);
export default Order;
