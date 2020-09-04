import * as log from "https://deno.land/std@0.67.0/log/mod.ts";
import { PicoPlaca } from "./pico-placa.ts";
import { input } from "./util/functions.ts";

async function main() {
  log.info(`This is the Pico & Placa predictor CLI.
  Please, enter the 1) Plate number, 2) Date and 3) Time, to check if the car can be on the road`);

  try {
    const plate = await input.promptPlate();
    const date = await input.promptDate();
    const dateTime = await input.promptTime(date);

    const onRoad = new PicoPlaca().canBeOnRoad(plate, dateTime);
    if (onRoad) {
      log.info(
        `The car with plate number '${plate}' can be on road in the date and time '${dateTime}' specified`,
      );
    } else {
      log.info(
        `The car with plate number '${plate}' cannot be on road in the date and time '${dateTime}' specified`,
      );
    }
  } catch (error) {
    log.error(error.message);
  }
  const exit = await input.prompt("Type 'exit' to finish or any key to continue");

  exit === "exit" ? Deno.exit() : main();
}

main();
