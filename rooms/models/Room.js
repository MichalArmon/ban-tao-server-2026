import { model, Schema } from "mongoose";
import { commonFields } from "../../helpers/subModels/CommonFields.js";
commonFields;

const roomSchema = new Schema(
  {
    ...commonFields,
    features: [String],
    maxGuests: Number,
    sizeM2: Number,
    bedType: String,
    priceBase: Number,
    currency: { type: String, default: "USD" },

    stock: { type: Number, default: 1 },
  },

  { timestamps: true },
);

const Room = model("room", roomSchema);
export default Room;
