import { Image } from "./Image.js";

export const commonFields = {
  title: { type: String, required: true },
  slug: { type: String, unique: true, index: true },
  blurb: { type: String },
  description: { type: String },
  bullets: [String],
  tags: [String],
  price: { type: Number, required: true },
  currency: { type: String, default: "THB" },
  hero: Image,
  gallery: [Image],
  isActive: { type: Boolean, default: true },
};
