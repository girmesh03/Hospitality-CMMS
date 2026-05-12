import mongoose from "mongoose";
import Organization from "../../models/organization.model.js";
import User from "../../models/user.model.js";
import { USER_STATUS } from "../../utils/constants.js";
import { ConflictError } from "../../utils/errors.js";

/**
 * @returns {Promise<{ bootstrapRequired: boolean }>}
 */
export const checkBootstrapStatus = async () => {
  const count = await Organization.countDocuments();
  return { bootstrapRequired: count === 0 };
};

/**
 * @param {{ orgName: string, subdomain?: string, timezone: string, currency?: string, email: string, firstName: string, lastName: string, password: string }} data
 * @returns {Promise<{ organization: object, user: object }>}
 */
export const initializeSystem = async (data) => {
  const orgCount = await Organization.countDocuments();
  if (orgCount > 0) {
    throw new ConflictError("System already initialized");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const organization = await Organization.create(
      [
        {
          name: data.orgName,
          subdomain: data.subdomain || null,
          timezone: data.timezone,
          currency: data.currency || "USD",
        },
      ],
      { session }
    );

    const user = await User.create(
      [
        {
          organizationId: organization[0]._id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          displayName: `${data.firstName} ${data.lastName}`,
          password: data.password,
          emailVerified: true,
          emailVerifiedAt: new Date(),
          status: USER_STATUS.ACTIVE,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return {
      organization: organization[0],
      user: user[0],
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
