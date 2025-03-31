import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: mongoose.Types.ObjectId; // Reference to Category
  images: string[]; // Array of image URLs
  discount?: number; // Optional discount percentage
  rating?: number; // Average rating
  merchant: mongoose.Types.ObjectId; // Reference to Merchant
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    images: { type: [String], required: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    merchant: { type: Schema.Types.ObjectId, ref: "Merchant", required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
