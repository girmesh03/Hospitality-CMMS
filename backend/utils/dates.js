import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatInTimezone = (date, tz, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(date).tz(tz).format(format);
};

export const formatUTC = (date, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(date).utc().format(format);
};

export const dateRange = (startDate, endDate) => {
  return {
    $gte: dayjs(startDate).startOf("day").toDate(),
    $lte: dayjs(endDate).endOf("day").toDate(),
  };
};

export const nowUTC = () => dayjs().utc().toDate();
