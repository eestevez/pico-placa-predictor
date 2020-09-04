import { DAYS_OF_WEEK } from "./constants.ts";

// Date functions
function dayOfWeek(date: Date): string {
  return DAYS_OF_WEEK[date.getDay()];
}

function validateDate(strDate: string): any {
  let regex = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[012])\-(\d{4})$/;

  let res = regex.exec(strDate);
  let date;
  if (res) {
    date = new Date(parseInt(res[3]), parseInt(res[2]) - 1, parseInt(res[1]));
    if (isValidDate(date)) {
      return date;
    }
  }
  throw new Error("The input date has a invalid format");
}

function validateTime(strTime: string, date: Date): any {
  let regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

  let res = regex.exec(strTime);
  if (res) {
    date.setUTCHours(parseInt(res[1]));
    date.setUTCMinutes(parseInt(res[2]));
    if (isValidDate(date)) {
      return date;
    }
  }
  throw new Error("The input time has a invalid format");
}

function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

// Pico & placa functions
function validatePlate(plate: string): any {
  let regex = /^[A-Z]{2,3}?- ?\d{3,4}?$/;

  let res = regex.exec(plate);
  if (res) {
    return plate;
  }
  throw new Error("The input plate number has a invalid format");
}

// Prompt functions for input data
async function promptPlate() {
  const plate = await prompt("Enter the car plate number (ex. AAA-0001)");
  return validatePlate(plate);
}

async function promptDate() {
  const strDate = await prompt("Enter the date (dd-MM-yyyy)");
  return validateDate(strDate);
}

async function promptTime(date: Date) {
  const time = await prompt("Enter the time (HH:mm)");
  return validateTime(time, date);
}

async function prompt(message: string = "") {
  const buf = new Uint8Array(1024);
  await Deno.stdout.write(new TextEncoder().encode(message + ": "));
  const n = <number> await Deno.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n)).trim();
}

export const util = {
  dayOfWeek,
  validatePlate,
  validateDate,
  validateTime
};

export const input = {
  prompt,
  promptPlate,
  promptDate,
  promptTime
};