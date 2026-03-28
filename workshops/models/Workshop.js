import { model, Schema } from "mongoose";
import { commonFields } from "../../helpers/subModels/CommonFields.js";
const workshopSchema = new Schema({
  ...commonFields,
  instructor: { type: String },
  duration: { type: Number },
  level: { type: String, default: "all" },
  isPrivate: { type: Boolean, default: false },
  isClosed: { type: Boolean, default: false },
});
const Workshop = model("workshop", workshopSchema);
export default Workshop;
