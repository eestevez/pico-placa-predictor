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
        date.setHours(17);
        date.setMinutes(0);
        r.asserts.assertEquals(date, util.validateTime(strTime, date));
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

  r.testSuite("function hasAllowedServicePlate(string)", () => {
    r.testCase(
      "Given a plate number with string format of car Then returns car allowed to be on road according to service type",
      () => {
        const plate34 = "AAA-0002";
        const plate33 = "UEM-045";
        const plate24 = "CC-0003";
        const plate23 = "OI-7698";
        const plate242 = "AT-7698";

        r.asserts.assertEquals(
          plate34,
          util.hasAllowedServicePlate(plate34)![0],
        );
        r.asserts.assertEquals(
          plate33,
          util.hasAllowedServicePlate(plate33)![0],
        );
        r.asserts.assertEquals(
          plate24,
          util.hasAllowedServicePlate(plate24)![0],
        );
        r.asserts.assertEquals(
          plate23,
          util.hasAllowedServicePlate(plate23)![0],
        );
        r.asserts.assertEquals(
          plate242,
          util.hasAllowedServicePlate(plate242)![0],
        );
      },
    );

    r.testCase(
      "Given a plate number with string format of car Then returns car is not allowed to be on road according to service type",
      () => {
        const plate34 = "DMA-0002";
        const plate33 = "PB-045";
        const plate24 = "DI-0003";
        const plate23 = "CCC-7698";
        const plate232 = "IT-003";

        const actual = null;

        r.asserts.assertEquals(
          actual,
          util.hasAllowedServicePlate(plate34),
        );
        r.asserts.assertEquals(
          actual,
          util.hasAllowedServicePlate(plate33),
        );
        r.asserts.assertEquals(
          actual,
          util.hasAllowedServicePlate(plate24),
        );
        r.asserts.assertEquals(
          actual,
          util.hasAllowedServicePlate(plate23),
        );
        r.asserts.assertEquals(
          actual,
          util.hasAllowedServicePlate(plate232),
        );
      },
    );
  });
});

r.run();
