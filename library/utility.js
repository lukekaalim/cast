// @flow strict
/*:: import type { Cast } from './main'; */

export const castConstant = /*:: <T>*/(value/*: mixed*/, constant/*: T*/)/*: T*/ => {
  if (constant !== value)
    throw new TypeError();
  return constant;
};

export class InvalidEnumError extends Error {
  /*:: value: mixed*/
  /*:: options: mixed[]*/

  constructor(value/*: mixed*/, options/*: mixed[]*/) {
    const valueName = (value && value.toString) ?
      (value.toString/*: any*/)() :
      'Enum Value';
    const optionsName = options.toString();
    super(`"${valueName}" is not one of ${optionsName}`);
    this.value = value;
    this.options = options;
  }
}

export const castEnum = /*:: <T: mixed[]>*/(value/*: mixed*/, options/*: T*/)/*: $ElementType<T, number>*/ => {
  const enumIndex = options.indexOf(value);
  if (enumIndex === -1)
    throw new InvalidEnumError(value, options);
  return options[enumIndex];
};

export const castNullable = /*::<T>*/(value/*: mixed*/, toValue/*: mixed => T*/)/*: null | T*/ => {
  if (value === null)
    return null;
  return toValue(value);
}
