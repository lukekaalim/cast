// @flow strict
/*:: import type { Cast }from './main'; */
const { toArray } = require("./primitives");

const toTuple = /*:: <A, B>*/(value/*: mixed*/, toA/*: Cast<A>*/, toB/*: Cast<B>*/)/*: [A, B]*/ => {
  const array = toArray(value);
  const [tupleA, tupleB] = array;
  return [toA(tupleA), toB(tupleB)];
};

module.exports = {
  toTuple,
};