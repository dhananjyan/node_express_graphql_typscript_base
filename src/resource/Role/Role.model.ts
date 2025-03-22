import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  permissions: string[];
  isActive: boolean;
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permissions: { type: [String], required: true },
  isActive: { type: Boolean, default: false },
});

export const RoleModel = mongoose.model<IRole>("Role", RoleSchema);
