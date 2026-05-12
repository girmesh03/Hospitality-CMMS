import { io } from "socket.io-client";

let socket;

/**
 * Connect to the Socket.IO server with an auth token.
 * @param {string} token - JWT access token for authentication
 * @returns {import("socket.io-client").Socket}
 */
export const connectSocket = (token) => {
  if (socket?.connected) return socket;

  socket = io(import.meta.env.VITE_API_URL || "", {
    auth: { token },
    transports: ["websocket", "polling"],
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });

  return socket;
};

/**
 * Disconnect the current socket connection.
 * @returns {void}
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

/**
 * Get the current socket instance (may be null).
 * @returns {import("socket.io-client").Socket | null}
 */
export const getSocket = () => socket;

/**
 * Subscribe to a socket event.
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @returns {void}
 */
export const subscribeToEvent = (event, handler) => {
  if (!socket) return;
  socket.on(event, handler);
};

/**
 * Unsubscribe from a socket event.
 * @param {string} event - Event name
 * @param {Function} handler - Event handler to remove
 * @returns {void}
 */
export const unsubscribeFromEvent = (event, handler) => {
  if (!socket) return;
  socket.off(event, handler);
};
