import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { BCRYPT_ROUNDS, USER_STATUS } from "../utils/constants.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    displayName: { type: String },
    password: { type: String },
    phone: { type: String },
    jobTitle: { type: String },
    employeeId: { type: String },
    avatar: { type: String },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    roleIds: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    propertyIds: [{ type: Schema.Types.ObjectId, ref: "Property" }],
    locationIds: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    teamIds: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    emailVerified: { type: Boolean, default: false },
    emailVerifiedAt: { type: Date },
    passwordHistory: [{ type: String }],
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    notificationPreferences: { type: Schema.Types.Mixed },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String },
    revision: { type: Number, default: 1 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.index({ email: 1, organizationId: 1 }, { unique: true });
userSchema.index({ organizationId: 1, status: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
