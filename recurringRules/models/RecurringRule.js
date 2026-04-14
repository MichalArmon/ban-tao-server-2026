import { model, Schema } from "mongoose";

const recurringRuleSchema = new Schema(
  {
    workshopId: {
      type: Schema.Types.ObjectId,
      ref: "workshop",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    daysOfWeek: [{ type: Number }], // למשל [1, 4] לימי שני וחמישי
    hour: { type: String, required: true }, // "10:30"
    location: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
  },
  { timestamps: true },
);

const RecurringRule = model("recurringRule", recurringRuleSchema);
export default RecurringRule;
