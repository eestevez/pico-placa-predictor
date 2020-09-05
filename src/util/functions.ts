import {
  DAYS_OF_WEEK,
  REGEXP_DATE,
  REGEXP_TIME,
  REGEXP_PLATE,
  REGEXP_2ndL,
  REGEXP_2L,
} from "./constants.ts";
import { TimePeriod } from "../pico-placa.ts";

// Date functions
const dayOfWeek = (date: Date): string => {
  return DAYS_OF_WEEK[date.getDay()];
};

const validateDate = (strDate: string): any => {
  let res = REGEXP_DATE.exec(strDate);
  let date;
  if (res) {
    date = new Date(parseInt(res[3]), parseInt(res[2]) - 1, parseInt(res[1]));
    if (isValidDate(date)) {
      return date;
    }
  }
  throw new Error("The input date has a invalid format");
};

const validateTime = (strTime: string, date: Date): any => {
  let res = REGEXP_TIME.exec(strTime);
  if (res) {
    date.setHours(parseInt(res[1]));
    date.setMinutes(parseInt(res[2]));
    if (isValidDate(date)) {
      return date;
    }
  }
  throw new Error("The input time has a invalid format");
};

const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

const cloneDate = (date: Date): Date => {
  return new Date(date.getTime());
};

const toTimePeriod = (strTimePeriod: string, date: Date): TimePeriod => {
  const periods = strTimePeriod.split("-");
  const startDateTime = validateTime(periods[0], cloneDate(date));
  const endDateTime = validateTime(periods[1], cloneDate(date));
  return new TimePeriod(startDateTime, endDateTime);
};

const toTimePeriodArr = (timePeriods: any, date: Date): Array<TimePeriod> => {
  const timePeriodArray = [];
  let tp;
  for (let timePeriod of timePeriods) {
    tp = toTimePeriod(timePeriod, date);
    timePeriodArray.push(tp);
  }
  return timePeriodArray;
};

// Plate number functions
const validatePlate = (plate: string): any => {
  let res = REGEXP_PLATE.exec(plate);
  if (res) {
    return plate;
  }
  throw new Error("The input plate number has a invalid format");
};

const hasAllowedServicePlate = (plate: string) => {
  let res = REGEXP_2ndL.exec(plate);
  let res2letter = REGEXP_2L.exec(plate);
  return (res || res2letter);
};

// Prompt functions for input data
const promptPlate = async () => {
  const plate = await prompt("Enter the car plate number (ex. AAA-0001)");
  return validatePlate(plate);
};

const promptDate = async () => {
  const strDate = await prompt("Enter the date (dd-MM-yyyy)");
  return { date: validateDate(strDate), strDate };
};

const promptTime = async (date: Date) => {
  const srtTime = await prompt("Enter the time (HH:mm)");
  return { dateTime: validateTime(srtTime, date), srtTime };
};

const prompt = async (message: string = "") => {
  const buf = new Uint8Array(1024);
  await Deno.stdout.write(new TextEncoder().encode(message + ": "));
  const n = <number> await Deno.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n)).trim();
};

export const util = {
  dayOfWeek,
  validatePlate,
  validateDate,
  validateTime,
  toTimePeriodArr,
  hasAllowedServicePlate,
};

export const input = {
  prompt,
  promptPlate,
  promptDate,
  promptTime,
};
