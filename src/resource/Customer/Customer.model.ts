import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export enum UserTypeEnum {
  BUYER = "BUYER",
  MERCHANT = "MERCHANT",
  DRIVER = "DRIVER"
}

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryId: mongoose.Types.ObjectId;
  password: string;
  userType: UserTypeEnum[];
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  countryId: { type: Schema.Types.ObjectId, ref: "Country", required: true },
  password: { type: String, required: true },
  userType: {
    type: [String],
    enum: Object.values(UserTypeEnum),
    required: true,
  }
}, {
  timestamps: true
});

// Pre-save hook to hash password before saving
CustomerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is unchanged

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

CustomerSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as { password?: string };
  if (update.password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update);
  }
  next();
});

// Method to compare hashed password
CustomerSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const CustomerModel = mongoose.model<ICustomer>("Customer", CustomerSchema);

export default CustomerModel;