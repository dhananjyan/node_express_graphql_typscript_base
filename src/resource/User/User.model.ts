import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: [String],
  password: { type: String, required: true },
}, {
  timestamps: true
});

// Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is unchanged

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as { password?: string };
  if (update.password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update);
  }
  next();
});

// Method to compare hashed password
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel