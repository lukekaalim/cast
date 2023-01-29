// @flow strict
import { InvalidCastError } from './error.js';
import { getNameOfMixed } from './description.js';

export class InvalidTypeError extends InvalidCastError {
  /*:: value: mixed*/
  /*:: recievedType: string*/
  /*:: expectedTypeName: string*/

  constructor(value/*: mixed*/, recievedType/*: string*/, expectedTypeName/*: string*/) {
    super(``, expectedTypeName, `it's ${recievedType}`);
    this.value = value;
    this.recievedType = recievedType;
    this.expectedTypeName = expectedTypeName;
  }
}

export const castObject = (value/*: mixed*/)/*: $ReadOnly<{ +[string]: mixed }>*/ => {
  if (typeof value !== 'object')
    throw new InvalidTypeError(value, getNameOfMixed(value), 'an object');
  if (value === null)
    throw new InvalidTypeError(value, 'null', 'an object');
  return value;
};

export const castArray = (value/*: mixed*/)/*: $ReadOnlyArray<mixed>*/ => {
  if (!Array.isArray(value))
    throw new InvalidTypeError(value, getNameOfMixed(value), 'an array');
  return value;
};

export const castNumber = (value/*: mixed*/)/*: number*/ => {
  if (typeof value !== 'number')
    throw new InvalidTypeError(value, getNameOfMixed(value), 'a number');
  return value;
};
export const castString = (value/*: mixed*/)/*: string*/ => {
  if (typeof value !== 'string')
    throw new InvalidTypeError(value, getNameOfMixed(value), 'a string');
  return value;
};
export const castBoolean = (value/*: mixed*/)/*: boolean*/ => {
  if (typeof value !== 'boolean')
    throw new InvalidTypeError(value, getNameOfMixed(value), 'a boolean');
  return value;
};
