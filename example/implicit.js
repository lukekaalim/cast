// @flow strict
import { createObjectCaster, castString, castBoolean } from "@lukekaalim/cast";

const implicitCaster = createObjectCaster({
  alpha: () => 100,
  beta: castString,
  gamma: castBoolean,
  delta: createObjectCaster({
    nested: castBoolean,
  })
});

const main = () => {
  try {
    const output = implicitCaster(100);
    output.alpha
  } catch (error) {
    console.error(error);
  }
};

main();