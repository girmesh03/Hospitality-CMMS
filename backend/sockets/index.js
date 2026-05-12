import { Server } from "socket.io";
import { socketConfig } from "../config/socket.js";
import { SOCKET_EVENTS, SOCKET_ROOMS } from "./events.js";
import { logger } from "../utils/logger.js";

let io = null;

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

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};

export const emitToRoom = (room, event, data) => {
  if (io) {
    io.to(room).emit(event, data);
  }
};

export const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(SOCKET_ROOMS.USER(userId)).emit(event, data);
  }
};
