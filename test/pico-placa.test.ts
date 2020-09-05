import { Rhum as r } from "https://deno.land/x/rhum@v1.1.2/mod.ts";

import { PicoPlaca, TimePeriod } from "../src/pico-placa.ts";
import { util } from "../src/util/functions.ts";
import { CALENDAR, TIME_PERIODS } from "../src/util/constants.ts";

r.testPlan("pico-placa.test.ts", () => {
  r.testSuite("function canBeOnRoad(plate: string, dateTime: Date)", () => {
    r.testCase(
      `Given the 'plate' and 'date' 'time', 
            where 
                  1) the day of week of the 'date' is allowed in Pico & Placa calendar (Sunday) 
       Then should returns true`,
      () => {
        const plate = util.validatePlate("AAA-0001");
        const date = util.validateDate("06-09-2020");
        const dateTime = util.validateTime(
          "7:01",
          date,
        );
        const timePeriodArr = util.toTimePeriodArr(TIME_PERIODS, date);
        const picoPlaca = new PicoPlaca(timePeriodArr, CALENDAR);
        const onRoad = picoPlaca.canBeOnRoad(plate, dateTime);
        r.asserts.assertEquals(true, onRoad);
      },
    );

    r.testCase(
      `Given the 'plate' and 'date' 'time', 
              where 
                    1) the day of week of the 'date' is NOT allowed in Pico & Placa calendar (Monday) AND
                    2) time is NOT in time period
       Then should returns true`,
      () => {
        const plate = util.validatePlate("AAA-0001");
        const date = util.validateDate("07-09-2020");
        const dateTime = util.validateTime(
          "20:01",
          date,
        );
        const timePeriodArr = util.toTimePeriodArr(TIME_PERIODS, date);
        const picoPlaca = new PicoPlaca(timePeriodArr, CALENDAR);
        const onRoad = picoPlaca.canBeOnRoad(plate, dateTime);
        r.asserts.assertEquals(true, onRoad);
      },
    );

    r.testCase(
      `Given the 'plate' and 'date' 'time', 
              where 
                    1) the day of week of the 'date' is NOT allowed in Pico & Placa calendar (Monday) AND
                    2) time is in time period AND
                    3) the 'plate' number is allowed to be on road by the Service type
       Then should returns true`,
      () => {
        const plate = util.validatePlate("AAA-0001");
        const date = util.validateDate("07-09-2020");
        const dateTime = util.validateTime(
          "09:01",
          date,
        );
        const timePeriodArr = util.toTimePeriodArr(TIME_PERIODS, date);
        const picoPlaca = new PicoPlaca(timePeriodArr, CALENDAR);
        const onRoad = picoPlaca.canBeOnRoad(plate, dateTime);
        r.asserts.assertEquals(true, onRoad);
      },
    );

    r.testCase(
      `Given the 'plate' and 'date' 'time', 
              where 
                    1) the day of week of the 'date' is NOT allowed in Pico & Placa calendar (Monday) AND
                    2) time is in time period AND
                    3) the 'plate' number is NOT allowed to be on road by the Service type AND 
                    4) the last digit of the car 'plate' number is NOT in the restrict calendar
       Then should returns true`,
      () => {
        const plate = util.validatePlate("PDU-0003");
        const date = util.validateDate("07-09-2020");
        const dateTime = util.validateTime(
          "09:01",
          date,
        );
        const timePeriodArr = util.toTimePeriodArr(TIME_PERIODS, date);
        const picoPlaca = new PicoPlaca(timePeriodArr, CALENDAR);
        const onRoad = picoPlaca.canBeOnRoad(plate, dateTime);
        r.asserts.assertEquals(true, onRoad);
      },
    );

    r.testCase(
      `Given the 'plate' and 'date' 'time', 
              where 
                    1) the day of week of the 'date' is NOT allowed in Pico & Placa calendar (Monday) AND
                    2) time is in time period AND
                    3) the 'plate' number is NOT allowed to be on road by the Service type AND 
                    4) the last digit of the car 'plate' number is in the restrict calendar
       Then should returns false`,
      () => {
        const plate = util.validatePlate("PDU-0002");
        const date = util.validateDate("07-09-2020");
        const dateTime = util.validateTime(
          "09:01",
          date,
        );
        const timePeriodArr = util.toTimePeriodArr(TIME_PERIODS, date);
        const picoPlaca = new PicoPlaca(timePeriodArr, CALENDAR);
        const onRoad = picoPlaca.canBeOnRoad(plate, dateTime);
        r.asserts.assertEquals(false, onRoad);
      },
    );
  });

  r.testSuite("function isAllowedInRestrictCalendar(string)", () => {
    r.testCase(
      "Given the day of week that is not restricted in the Pico & placa calendar Then returns true",
      () => {
        const picoPlaca = new PicoPlaca([], CALENDAR);

        const allowed = picoPlaca.isAllowedInRestrictCalendar("Saturday");

        r.asserts.assertEquals(true, allowed);
      },
    );
    r.testCase(
      "Given the day of week that is restricted in the Pico & placa calendar Then returns false",
      () => {
        const picoPlaca = new PicoPlaca([], CALENDAR);

        const allowed = picoPlaca.isAllowedInRestrictCalendar("Monday");

        r.asserts.assertEquals(false, allowed);
      },
    );
  });

  r.testSuite("function isInTimePeriod(Date)", () => {
    r.testCase(
      "Given the 'date' and 'time' that are in the first time period Then should returns true",
      () => {
        const date = util.validateDate("08-09-2020");
        const dateTime = util.validateTime(
          "08:17",
          date,
        );
        const timePeriodArr = util.toTimePeriodArr(TIME_PERIODS, date);
        const picoPlaca = new PicoPlaca(timePeriodArr, CALENDAR);
        const isInTimePeriod = picoPlaca.isInTimePeriod(dateTime);

        r.asserts.assertEquals(true, isInTimePeriod);
      },
    );
    r.testCase(
      "Given the 'date' and 'time' that are in the second time period Then should returns true",
      () => {
        const date = util.validateDate("08-09-2020");
        const dateTime = util.validateTime(
          "18:04",
          date,
        );
        const timePeriodArr = util.toTimePeriodArr(TIME_PERIODS, date);
        const picoPlaca = new PicoPlaca(timePeriodArr, CALENDAR);
        const isInTimePeriod = picoPlaca.isInTimePeriod(dateTime);

        r.asserts.assertEquals(true, isInTimePeriod);
      },
    );
    r.testCase(
      "Given the 'date' and 'time' that are not in the time period Then should returns false",
      () => {
        const date = util.validateDate("08-09-2020");
        const dateTime = util.validateTime(
          "21:37",
          date,
        );
        const timePeriodArr = util.toTimePeriodArr(TIME_PERIODS, date);
        const picoPlaca = new PicoPlaca(timePeriodArr, CALENDAR);
        const isInTimePeriod = picoPlaca.isInTimePeriod(dateTime);

        r.asserts.assertEquals(false, isInTimePeriod);
      },
    );
  });

  r.testSuite(
    "function isRestrictedByLastDigit(plate: string, dayOfWeek: string) ",
    () => {
      r.testCase(
        "Given the plate number that has a last digit restricted in calendar by the day of week Then returns true",
        () => {
          const picoPlaca = new PicoPlaca([], CALENDAR);

          const restricted = picoPlaca.isRestrictedByLastDigit(
            "AAC-2064",
            "Tuesday",
          );

          r.asserts.assertEquals(true, restricted);
        },
      );
      r.testCase(
        "Given the plate number that has a last digit not restricted in calendar by the day of week Then returns false",
        () => {
          const picoPlaca = new PicoPlaca([], CALENDAR);

          const restricted = picoPlaca.isRestrictedByLastDigit(
            "AAC-2063",
            "Monday",
          );

          r.asserts.assertEquals(false, restricted);
        },
      );
    },
  );
});

r.run();
