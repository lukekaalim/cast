// @flow strict

const toObject = (value/*: mixed*/)/*: { +[string]: mixed }*/ => {
  if (typeof value !== 'object')
    throw new TypeError(`${typeof value} was not an object`);
  if (value === null)
    throw new TypeError(`${typeof value} was null`);
  return value;
};

const toArray = (value/*: mixed*/)/*: $ReadOnlyArray<mixed>*/ => {
  if (!Array.isArray(value))
    throw new TypeError(`${typeof value} was not an array`);
  return value;
};

const toNumber = (value/*: mixed*/)/*: number*/ => {
  if (typeof value !== 'number')
    throw new TypeError(`${typeof value} was not a number`);
  return value;
};
const toString = (value/*: mixed*/)/*: string*/ => {
  if (typeof value !== 'string')
    throw new TypeError(`${typeof value} was not a string`);
  return value;
};
const toBoolean = (value/*: mixed*/)/*: boolean*/ => {
  if (typeof value !== 'boolean')
    throw new TypeError(`${typeof value} was not a boolean`);
  return value;
};

module.exports = {
  toObject,
  object: toObject,
  toArray,
  array: toArray,
  toString,
  string: toString,
  toNumber,
  number: toNumber,
  toBoolean,
  boolean: toBoolean
}
