import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

/** Format a date string in a specific IANA timezone. @param {string|Date} date - Input date. @param {string} tz - IANA timezone (e.g. "America/New_York"). @param {string} [format="YYYY-MM-DD HH:mm:ss"] - dayjs output format. @returns {string} Formatted date string. */
export const formatInTimezone = (date, tz, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(date).tz(tz).format(format);
};

/** Format a date string in UTC. @param {string|Date} date - Input date. @param {string} [format="YYYY-MM-DD HH:mm:ss"] - dayjs output format. @returns {string} Formatted UTC date string. */
export const formatUTC = (date, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(date).utc().format(format);
};

/** Build a MongoDB $gte/$lte query for a date range. @param {string|Date} startDate - Range start. @param {string|Date} endDate - Range end. @returns {{$gte: Date, $lte: Date}} */
export const dateRange = (startDate, endDate) => {
  return {
    $gte: dayjs(startDate).startOf("day").toDate(),
    $lte: dayjs(endDate).endOf("day").toDate(),
  };
};

/** Get the current UTC Date. @returns {Date} Current UTC date. */
export const nowUTC = () => dayjs().utc().toDate();
