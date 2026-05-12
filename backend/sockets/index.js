import { Server } from "socket.io";
import { socketConfig } from "../config/socket.js";
import { SOCKET_EVENTS, SOCKET_ROOMS } from "./events.js";
import { logger } from "../utils/logger.js";

let io = null;

/** Attach Socket.IO to an HTTP server and set up connection/subscribe/disconnect handlers. @param {import("http").Server} server - HTTP server. @returns {import("socket.io").Server} Socket.IO server instance. */
export const initializeSocket = (server) => {
  io = new Server(server, socketConfig);

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on(SOCKET_EVENTS.SUBSCRIBE, (data) => {
      if (data?.propertyId) {
        socket.join(SOCKET_ROOMS.PROPERTY(data.propertyId));
      }
      if (data?.userId) {
        socket.join(SOCKET_ROOMS.USER(data.userId));
      }
    });

    socket.on(SOCKET_EVENTS.UNSUBSCRIBE, (data) => {
      if (data?.propertyId) {
        socket.leave(SOCKET_ROOMS.PROPERTY(data.propertyId));
      }
      if (data?.userId) {
        socket.leave(SOCKET_ROOMS.USER(data.userId));
      }
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

/** Get the initialized Socket.IO server instance (throws if not yet initialized). @returns {import("socket.io").Server} */
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};

/** Emit an event to all sockets in a room. @param {string} room - Room name. @param {string} event - Event name. @param {*} data - Payload. */
export const emitToRoom = (room, event, data) => {
  if (io) {
    io.to(room).emit(event, data);
  }
};

/** Emit an event to a specific user's room. @param {string} userId - User ID. @param {string} event - Event name. @param {*} data - Payload. */
export const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(SOCKET_ROOMS.USER(userId)).emit(event, data);
  }
};
