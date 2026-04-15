import { Server } from "socket.io";
import corsOptions from "./cors.js";
import logger from "./logger.js";
import { registerSocketHandlers } from "../sockets/index.js";

let socketServerInstance = null;

/**
 * Creates and binds the shared Socket.IO server instance.
 *
 * @param {import("http").Server} httpServer - Node HTTP server.
 * @returns {Server} Socket.IO server.
 */
export const initializeSocketServer = (httpServer) => {
  if (socketServerInstance) {
    return socketServerInstance;
  }

  socketServerInstance = new Server(httpServer, {
    cors: corsOptions,
  });

  registerSocketHandlers(socketServerInstance);
  logger.info("Socket.IO server initialized", {
    route: "socket.initialize",
  });

  return socketServerInstance;
};

/**
 * Returns the shared Socket.IO server instance.
 *
 * @returns {Server | null} Socket.IO server or `null`.
 */
export const getSocketServer = () => socketServerInstance;

/**
 * Emits a shared event if the Socket.IO server has been initialized.
 *
 * @param {string} eventName - Socket event name.
 * @param {unknown} payload - Event payload.
 * @returns {void}
 */
export const emitSocketEvent = (eventName, payload) => {
  if (!socketServerInstance) {
    return;
  }

  socketServerInstance.emit(eventName, payload);
};

/**
 * Closes the shared Socket.IO server if it has been initialized.
 *
 * @returns {Promise<void>} Resolution once the server is closed.
 */
export const closeSocketServer = async () => {
  if (!socketServerInstance) {
    return;
  }

  await socketServerInstance.close();
  socketServerInstance = null;
};

export default initializeSocketServer;
