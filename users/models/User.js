import { model, Schema } from "mongoose";
import { EMAIL, PHONE } from "../../helpers/mongooseValidators.js";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: EMAIL,
    password: { type: String, required: true },
    phone: PHONE,
    role: {
      type: String,
      enum: ["user", "admin", "staff"],
      default: "user",
    },

    dietaryRestrictions: { type: String, default: "none" },
    birthDate: {
      type: Date, // אנחנו מסבירים למסד הנתונים שזה לא סתם טקסט, אלא תאריך
      required: true, // זה אומר שאי אפשר להירשם בלי לספק תאריך לידה
    },
  },

  { timestamps: true },
);

const User = model("user", userSchema);
export default User;
