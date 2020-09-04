import { Rhum as r } from "https://deno.land/x/rhum@v1.1.2/mod.ts";

import { util } from "../src/util/functions.ts";

r.testPlan("functions.test.ts", () => {
  r.testSuite("function dayOfWeek(Date)", () => {
    r.testCase("Given a date Then returns a corresponding day of week", () => {
      const date = new Date(2020, 11, 10);
      r.asserts.assertEquals("Thursday", util.dayOfWeek(date));
    });
    r.testCase("Given a date Then returns a different day of week", () => {
      const date = new Date(2020, 11, 9);
      r.asserts.assertNotEquals("Thursday", util.dayOfWeek(date));
    });
  });

  r.testSuite("function validateDate(string)", () => {
    r.testCase(
      "Given a date with string format Then returns a valid Date",
      () => {
        const strDate = "10-01-2019";
        const actual = new Date(2019, 0, 10);
        r.asserts.assertEquals(actual, util.validateDate(strDate));
      },
    );
    r.testCase(
      "Given a date with invalid string format Then returns an invalid format date Error",
      () => {
        const strDate = "101-01-20119";
        r.asserts.assertThrows((): void => {
          util.validateDate(strDate);
        }, Error);
      },
    );
  });

  r.testSuite("function validateTime(string, Date)", () => {
    r.testCase(
      "Given a time with string format and a date Then returns a valid Date with time",
      () => {
        const strTime = "17:00";
        const date = new Date(2019, 0, 10);
        const actual = new Date("2019-01-10T17:00:00.000Z");
        r.asserts.assertEquals(actual, util.validateTime(strTime, date));
      },
    );
    r.testCase(
      "Given a time with invalid string format and a date Then returns an invalid format date Error",
      () => {
        const strTime = "77:00";
        const date = new Date(2019, 0, 10);
        r.asserts.assertThrows((): void => {
          util.validateTime(strTime, date);
        }, Error);
      },
    );
  });

  r.testSuite("function validatePlate(string)", () => {
    r.testCase(
      "Given a plate number with string format Then returns a valid plate number",
      () => {
        const plate34 = "AAA-0002";
        const plate33 = "AAA-045";
        const plate24 = "CC-0002";
        const plate23 = "CD-762";

        r.asserts.assertEquals(plate34, util.validatePlate(plate34));
        r.asserts.assertEquals(plate33, util.validatePlate(plate33));
        r.asserts.assertEquals(plate24, util.validatePlate(plate24));
        r.asserts.assertEquals(plate23, util.validatePlate(plate23));
      },
    );
    r.testCase(
      "Given a plate number with invalid string format Then returns a invalid plate Error",
      () => {
        const plate14 = "A0-2";

        r.asserts.assertThrows((): void => {
          util.validatePlate(plate14);
        }, Error);
      },
    );
  });
});

r.run();
