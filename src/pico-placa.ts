import { util } from "./util/functions.ts";

export class PicoPlaca {
  timePeriodArr: Array<TimePeriod>;
  restrictCalendar: Map<string, Array<number>>;

  constructor(
    timePeriodArr: Array<TimePeriod>,
    restrictCalendar: Map<string, Array<number>>,
  ) {
    this.timePeriodArr = timePeriodArr;
    this.restrictCalendar = restrictCalendar;
  }

  canBeOnRoad(plate: string, dateTime: Date): boolean {
    // 1) Calculate day of week given the 'date'
    const dayOfWeek = util.dayOfWeek(dateTime);
    // 2) Check if the day of week of the date is not restricted in Pico & Placa calendar (Ex. Saturday or Sunday)
    if (!this.isAllowedInRestrictCalendar(dayOfWeek)) {
      // 3) Check if a car is not in the hours periods given the 'date' and 'time'
      if (this.isInTimePeriod(dateTime)) {
        // 4) Check the car 'plate' number structure to identify if it is allowed to be on road",
        if (!util.hasAllowedServicePlate(plate)) {
          // 5) Check if the last digit of the car 'plate' number is in the restrict calendar
          //    by the calculated day of week from date input
          if (this.isRestrictedByLastDigit(plate, dayOfWeek)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  // Check if the day of week of the date is not restricted in Pico & Placa calendar (Ex. Saturday or Sunday)
  isAllowedInRestrictCalendar(dayOfWeek: string) {
    const restrictPlateDigitArr = this.restrictCalendar.get(dayOfWeek);
    return (restrictPlateDigitArr!.length === 0);
  }

  // Check if a car is not in the hours periods given the 'date' and 'time'
  isInTimePeriod(dateTime: Date) {
    let included = false;
    for (let timePeriod of this.timePeriodArr) {
      if (timePeriod.includes(dateTime)) {
        included = true;
        break;
      }
    }
    return included;
  }

  // Check if the last digit of the car 'plate' number is in the restrict calendar
  // by the calculated day of week from date input
  isRestrictedByLastDigit(plate: string, dayOfWeek: string) {
    const restrictPlateDigitArr = this.restrictCalendar.get(dayOfWeek);
    var lastDigit = parseInt(plate[plate.length - 1]);
    let restricted = false;
    for (const restrictPlateDigit of restrictPlateDigitArr!) {
      if (lastDigit === restrictPlateDigit) {
        restricted = true;
        break;
      }
    }
    return restricted;
  }
}

export class TimePeriod {
  startDateTime: Date;
  endDateTime: Date;

  constructor(startDateTime: Date, endDateTime: Date) {
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
  }

  includes(dateTime: Date) {
    return dateTime >= this.startDateTime && dateTime <= this.endDateTime;
  }
}
