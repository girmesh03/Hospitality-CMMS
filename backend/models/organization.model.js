import mongoose from "mongoose";
import { ORGANIZATION_STATUS } from "../utils/constants.js";

const { Schema } = mongoose;

/** Organization schema definition */
const organizationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, unique: true, uppercase: true },
    subdomain: { type: String, lowercase: true, unique: true, sparse: true },
    timezone: { type: String, required: true },
    currency: { type: String, default: "USD" },
    language: { type: String, default: "en" },
    logo: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    status: { type: String, enum: [ORGANIZATION_STATUS.ACTIVE, ORGANIZATION_STATUS.INACTIVE], default: ORGANIZATION_STATUS.ACTIVE },
    settings: {
      defaultServiceWindows: { type: Schema.Types.Mixed },
      quietHours: { type: Schema.Types.Mixed },
      businessHours: { type: Schema.Types.Mixed },
    },
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

organizationSchema.index({ name: 1 });
organizationSchema.index({ code: 1 });

/**
 * Organization model.
 * @type {import("mongoose").Model<import("mongoose").Document>}
 */
const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
