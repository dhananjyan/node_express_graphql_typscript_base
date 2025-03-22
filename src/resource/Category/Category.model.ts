import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentCategory?: string | null;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  parentCategory: { type: Schema.Types.ObjectId, ref: "Category", default: null }, // For subcategories
  image: { type: String, default: "" }, // Store URL of category image
}, {
  timestamps: true
});

const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);

export default CategoryModel