/** Socket.IO event name constants. @type {object} */
export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  SUBSCRIBE: "subscribe",
  UNSUBSCRIBE: "unsubscribe",
  WORK_ORDER_UPDATED: "work_order_updated",
  REQUEST_UPDATED: "request_updated",
  PM_GENERATED: "pm_generated",
  NOTIFICATION_RECEIVED: "notification_received",
  USER_MENTIONED: "user_mentioned",
  COMMENT_ADDED: "comment_added",
};

/** Socket.IO room name helpers. @type {{PROPERTY: function, USER: function}} */
export const SOCKET_ROOMS = {
  PROPERTY: (propertyId) => `property:${propertyId}`,
  USER: (userId) => `user:${userId}`,
};
