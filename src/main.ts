import * as log from "https://deno.land/std@0.68.0/log/mod.ts";
import { PicoPlaca } from "./pico-placa.ts";
import { input, util } from "./util/functions.ts";
import { CALENDAR, TIME_PERIODS } from "./util/constants.ts";

(async function main() {
  log.info(`This is the Pico & Placa predictor CLI.
  Please, enter the 1) Plate number, 2) Date and 3) Time, to check if the car can be on the road`);

  try {
    const strPlate = await input.promptPlate();
    const { date, strDate } = await input.promptDate();
    const { dateTime, srtTime } = await input.promptTime(date);

    const timePeriodArr = util.toTimePeriodArr(TIME_PERIODS, date);
    const picoPlaca = new PicoPlaca(timePeriodArr, CALENDAR);

    const onRoad = picoPlaca.canBeOnRoad(strPlate, dateTime);

    if (onRoad) {
      log.info(
        `The car with plate number '${strPlate}' can be on road in the date '${strDate}' and time '${srtTime}' specified`,
      );
    } else {
      log.info(
        `The car with plate number '${strPlate}' cannot be on road in the date '${strDate}' and time '${srtTime}' specified`,
      );
    }
  } catch (error) {
    log.error(error.message);
  }
  const exit = await input.prompt(
    "Type 'exit' to finish or any key to continue",
  );

  exit === "exit" ? Deno.exit() : main();
})();
