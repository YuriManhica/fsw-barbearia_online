import { addMinutes, format, setHours, setMinutes } from "date-fns";

export function generateDateTimeList(date: Date): string[] {
  const starTime = setMinutes(setHours(date, 9), 0); // set start time to 09:00
  const endTime = setMinutes(setHours(date, 21), 0); // set end time to 09:00
  const interval = 45; //set interval in 45 minutes
  const dateTimeList: string[] = [];

  let currentTime = starTime;

  while (currentTime <= endTime) {
    dateTimeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return dateTimeList;
}
