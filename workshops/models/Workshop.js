import { model, Schema } from "mongoose";
import { commonFields } from "../../helpers/subModels/CommonFields.js";
const workshopSchema = new Schema({
  ...commonFields,
  instructor: { type: String },
  duration: { type: Number },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "all"],
    default: "all",
  },
  category: {
    type: String,
    enum: ["surfing", "yoga", "fitness", "wellness", "nature"],
    required: true,
  },
  isPrivate: { type: Boolean, default: false },
  isClosed: { type: Boolean, default: false },
  defaultCapacity: { type: Number, default: 10 },
});

const Workshop = model("workshop", workshopSchema);
export default Workshop;
