import mongoose from "mongoose";

const { Schema } = mongoose;

/** User session schema definition */
const userSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    refreshToken: { type: String, required: true },
    userAgent: { type: String },
    ip: { type: String },
    deviceInfo: { type: String },
    issuedAt: { type: Date, default: Date.now },
    lastActivityAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
    revokedAt: { type: Date },
    revocationReason: { type: String },
  },
  {
    timestamps: true,
  }
);

userSessionSchema.index({ refreshToken: 1 });
userSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

/**
 * UserSession model.
 * @type {import("mongoose").Model<import("mongoose").Document>}
 */
const UserSession = mongoose.model("UserSession", userSessionSchema);

export default UserSession;
