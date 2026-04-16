import { io } from "socket.io-client";

const SOCKET_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:4000";

let accessTokenReader = () => null;
let socketInstance = null;

/**
 * Registers auth readers used by the shared socket shell.
 *
 * @param {{getAccessToken?: () => string | null}} [config={}] - Socket shell configuration.
 * @returns {void}
 */
export const configureSocketClient = (config = {}) => {
  accessTokenReader = typeof config.getAccessToken === "function" ? config.getAccessToken : accessTokenReader;
};

/**
 * Returns the singleton Socket.IO client instance.
 *
 * @returns {import("socket.io-client").Socket} Shared socket client.
 */
export const getSocketClient = () => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_BASE_URL, {
      autoConnect: false,
      transports: ["websocket"],
      withCredentials: true,
    });
  }

  return socketInstance;
};

/**
 * Connects the socket client using the current auth shell state.
 *
 * @returns {import("socket.io-client").Socket} Connected or pending socket client.
 */
export const connectSocket = () => {
  const socket = getSocketClient();
  socket.auth = {
    token: accessTokenReader(),
  };

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

/**
 * Disconnects the socket client when active.
 *
 * @returns {void}
 */
export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
  }
};

/**
 * Subscribes to a socket event and returns an unsubscribe callback.
 *
 * @param {string} eventName - Socket event name.
 * @param {(payload: unknown) => void} handler - Event handler.
 * @returns {() => void} Unsubscribe callback.
 */
export const subscribeToSocketEvent = (eventName, handler) => {
  const socket = getSocketClient();
  socket.on(eventName, handler);

  return () => {
    socket.off(eventName, handler);
  };
};

export default getSocketClient;
