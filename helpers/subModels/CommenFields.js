import { Image } from "./Image";

export const commonFields = {
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  currency: { type: String, default: "THB" },
  hero: Image,
  gallery: [Image],
  isActive: { type: Boolean, default: true },
};
