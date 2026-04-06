import { model, Schema } from "mongoose";
import { commonFields } from "../../helpers/subModels/CommonFields.js";
import { ROOM_TYPE, VIEW } from "../../helpers/mongooseValidators.js";

const roomSchema = new Schema(
  {
    ...commonFields,
    features: [String],
    maxGuests: Number,
    sizeM2: Number,
    bedType: String,

    stock: { type: Number, default: 1 },
    roomType: ROOM_TYPE,
    view: VIEW,
  },

  { timestamps: true },
);

const Room = model("room", roomSchema);
export default Room;
