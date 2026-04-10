import { model, Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    // קישור לתבנית (למשל לסדנת הגלישה שיצרנו)
    workshopId: {
      type: Schema.Types.ObjectId,
      ref: "workshop",
      required: true,
    },

    // זמן ומיקום - זה מה שמשתנה מסשן לסשן
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }, // נחשב אותו ב-Logic לפי ה-duration מהתבנית

    location: {
      type: String,
      enum: ["Studio A", "Studio B", "Beach", "Poolside"],
      required: true,
    },

    // ניהול קיבולת (יכול להיות שונה מה-default של התבנית)
    maxCapacity: { type: Number, required: true },

    // רשימת המשתתפים שנרשמו לסשן הספציפי הזה
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
  },
  { timestamps: true },
);

const Session = model("session", sessionSchema);
export default Session;
