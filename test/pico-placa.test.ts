import { Rhum as r } from "https://deno.land/x/rhum@v1.1.2/mod.ts";

import { PicoPlaca } from "../src/pico-placa.ts";
import { util } from "../src/util/functions.ts";

r.testPlan("pico-placa.test.ts", () => {
  r.testSuite("Car can be on road", () => {
    r.testCase("Returns car can be on the road", () => {
      const plate = util.validatePlate("AAA-0001");
      const dateTime = util.validateTime(
        "17:00",
        util.validateDate("10-12-2020"),
      );
      const picoPlaca = new PicoPlaca();
      const onRoad = picoPlaca.canBeOnRoad(plate, dateTime);
      r.asserts.assertEquals(true, onRoad);
    });
  });
});

r.run();
