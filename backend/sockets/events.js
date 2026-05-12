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

export const SOCKET_ROOMS = {
  PROPERTY: (propertyId) => `property:${propertyId}`,
  USER: (userId) => `user:${userId}`,
};
