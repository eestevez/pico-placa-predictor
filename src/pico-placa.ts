import { util } from "./util/functions.ts";

export class PicoPlaca {
  constructor() {
  }

  canBeOnRoad(plate: string, dateTime: Date) {
    // 1) Calculate day of week given the 'date'
    const dayOfWeek = util.dayOfWeek(dateTime);

    // 2) Check if the day of week is not restricted in Pico & Placa days (Saturday or Sunday)
    

    // 3) Check if a car is in the hours period given the 'time'

    
    // 4) Check the car 'plate' number to identify if it can be on road

    return true;
  }
}

