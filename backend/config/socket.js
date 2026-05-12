import { env } from "./env.js";

export const socketConfig = {
  cors: {
    origin: env.corsOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
  pingInterval: 25000,
  pingTimeout: 20000,
};
