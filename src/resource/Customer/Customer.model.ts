import mongoose, { Schema, Document } from "mongoose";

export interface Customer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
}

const CustomerSchema = new Schema<Customer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true },
  password: { type: String, required: true },
});

export const CustomerModel = mongoose.model<Customer>("Customer", CustomerSchema);
