import logger from "../config/logger.js";

/**
 * Registers the shared Socket.IO connection lifecycle handlers.
 *
 * @param {import("socket.io").Server} socketServer - Socket.IO server.
 * @returns {void}
 */
export const registerSocketHandlers = (socketServer) => {
  socketServer.on("connection", (socket) => {
    logger.info("Socket client connected", {
      route: "socket.connection",
      socketId: socket.id,
    });

    socket.on("disconnect", (reason) => {
      logger.info("Socket client disconnected", {
        route: "socket.disconnect",
        socketId: socket.id,
        reason,
      });
    });
  });
};

export default registerSocketHandlers;
