import { model, Schema } from "mongoose";
import { commonFields } from "../../helpers/subModels/CommonFields.js";
const treatmentSchema = new Schema({
  ...commonFields,
  therapist: { type: String },
  duration: { type: Number },
  level: { type: String, default: "all" },
  isPrivate: { type: Boolean, default: false },
  isClosed: { type: Boolean, default: false },
  contraindications: [String],
  intensity: String,
});
const Treatment = model("treatment", treatmentSchema);
export default Treatment;
