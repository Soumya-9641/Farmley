import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  brand: string;
  category: string;
  description: string;
  ingredients: string[];
  price: {
    mrp: number;
    offerPrice: number;
  };
  shelfLife: string;
  processedBy: {
    company: string;
    address: string;
  };
  images: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true, default: "Farmley" },
    category: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
    price: {
      mrp: { type: Number, required: true },
      offerPrice: { type: Number, required: true },
    },
    shelfLife: { type: String, required: true },
    processedBy: {
      company: { type: String, required: true },
      address: { type: String, required: true },
    },
    images: [{ type: String }],
    stock: { type: Number, required: true, default: 100 },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
