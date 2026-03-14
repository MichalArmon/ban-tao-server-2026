import { model, Schema } from "mongoose";
import { Image } from "../../helpers/subModels/Image.js";

const roomSchema = new Schema(
  {
    slug: { type: String, unique: true, index: true },
    title: { type: String, required: true },
    blurb: { type: String },
    features: [String],
    maxGuests: Number,
    sizeM2: Number,
    bedType: String,
    priceBase: Number,
    currency: { type: String, default: "USD" },

    hero: Image,
    images: [Image],

    stock: { type: Number, default: 1 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Room = model("room", roomSchema);
export default Room;
