// @flow strict
import { createConstantCaster } from './constant.js';
import { createObjectCaster, createTupleCaster, createArrayCaster } from './complex.js';
import { castString, castBoolean, castNumber } from './primitives.js';
import { createNullableCaster, createConstantUnionCaster, createKeyedUnionCaster } from './union.js';

export const c = {
  lit: createConstantCaster,
  obj: createObjectCaster,
  arr: createArrayCaster,
  tup: createTupleCaster,

  str: castString,
  bool: castBoolean,
  num: castNumber,
  maybe: createNullableCaster,
  enums: createConstantUnionCaster,
  or: createKeyedUnionCaster,
};
