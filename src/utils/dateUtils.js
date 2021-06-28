import moment from "moment";
import { dateFormat, dayName } from "./enums";

export const getConsecutiveDates = (totalDays) => {
  const consecutiveDays = [];
  for (let index = 0; index < totalDays; index++) {
    consecutiveDays.push({
      currentDate: moment().add(index, "day").format(dateFormat),
      currentDayName: moment()
        .add(index, "day")
        .format(dayName)
        .toLocaleUpperCase(),
    });
  }
  return consecutiveDays;
};
