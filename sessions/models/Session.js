import { model, Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    // קישור לתבנית (למשל לסדנת הגלישה שיצרנו)
    workshopId: {
      type: Schema.Types.ObjectId,
      ref: "workshop",
      required: true,
    },
    ruleId: {
      type: Schema.Types.ObjectId,
      ref: "rule", // שימי לב: ודאי שככה קוראים למודל של החוקים אצלך ("rule" או "recurringRule")
      required: false, // חשוב מאוד שזה יהיה false! כדי שנוכל ליצור סשן בודד בלי חוק
    },

    // זמן ומיקום - זה מה שמשתנה מסשן לסשן
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }, // נחשב אותו ב-Logic לפי ה-duration מהתבנית

    location: {
      type: String,
      enum: ["Studio A", "Studio B", "Beach", "Poolside"],
      required: true,
    },

    maxCapacity: { type: Number, required: true },

    enrolledUsers: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "user" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],

    status: {
      type: String,
      enum: ["scheduled", "cancelled", "completed"],
      default: "scheduled",
    },
    isRecursive: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Session = model("session", sessionSchema);
export default Session;
