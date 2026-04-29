import { Schema } from "mongoose";

export const Favorites = new Schema(
  {
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    treatments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Treatment",
      },
    ],
    workshops: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workshop",
      },
    ],
  },
  { _id: false },
);
