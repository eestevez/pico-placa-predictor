const SUNDAY = "Sunday";
const MONDAY = "Monday";
const TUESDAY = "Tuesday";
const WEDNESDAY = "Wednesday";
const THURSDAY = "Thursday";
const FRIDAY = "Friday";
const SATURDAY = "Saturday";

// Array: days of the week
const DAYS_OF_WEEK = [
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
];

// Map: calendar with key: date of week, and value: array of last number of plate
const calendar = new Map<string, Array<number>>();
calendar.set(MONDAY, [1, 2]);
calendar.set(TUESDAY, [3, 4]);
calendar.set(WEDNESDAY, [5, 6]);
calendar.set(THURSDAY, [7, 8]);
calendar.set(FRIDAY, [9, 0]);
calendar.set(SATURDAY, []);
calendar.set(SUNDAY, []);

// Array: contains all the time periods when the Pico y placa is applied
const timePeriods = ["7:00-9:30", "16:00-19:30"];

// Regular Expressions
// Date regexp
const REGEXP_DATE = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[012])\-(\d{4})$/;
// Time regexp
const REGEXP_TIME = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
// Plate regexp, considering starting with all provinces codes (A,B,U,C,X,H,O,E,Q,W,G,I,L,R,M,V,N,S,P,Y,J,K,T,Z)
const REGEXP_PLATE = /^[ABUCXHOEQWGILRMVNSPYJKTZ]{1}[A-Z]{1,2}?-?\d{3,4}?$/;
// Allowed car service according to second letters (E,X,M,S,A,U,Z) of plate number
const REGEXP_2ndL =
  /^[ABUCXHOEQWGILRMVNSPYJKTZ]{1}[EXMSAUZ]{1}[A-Z]{1}?-?\d{3,4}?$/;
// Allowed car service according to the two letters only (CC,CD,OI,AT) of plate number
const REGEXP_2L = /^(CC|CD|OI|AT)?-?\d{3,4}?$/;

export {
  DAYS_OF_WEEK,
  calendar as CALENDAR,
  timePeriods as TIME_PERIODS,
  REGEXP_DATE,
  REGEXP_TIME,
  REGEXP_PLATE,
  REGEXP_2ndL,
  REGEXP_2L,
};
