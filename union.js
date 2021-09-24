// @flow strict
/*:: import type { Cast } from './main.js'; */
import { getNameOfMixed } from './description.js';
import { castObject, castString } from "./primitives.js";
import { InvalidCastError } from './error.js';

export class InvalidKeyError extends InvalidCastError {
  /*:: keyProperty: string*/
  /*:: providedKey: string*/
  /*:: acceptedKeys: $ReadOnlyArray<string>*/

  constructor(
    cause/*: Error*/,
    keyProperty/*: string*/,
    acceptedKeys/*: $ReadOnlyArray<string>*/
  ) {
    if (cause instanceof InvalidCastError)
      super(`.${keyProperty}`, `one of ${acceptedKeys.toString()}`, cause.causeDescription);
    else
      super(`.${keyProperty}`, `one of ${acceptedKeys.toString()}`, cause.message);

    this.keyProperty = keyProperty;
    this.acceptedKeys = acceptedKeys;
  }
}

/*::
export type KeyedUnionInfo<T> = {
  [key: string]: ?Cast<T>
};
*/

export const createKeyedUnionCaster = /*:: <T>*/(
  keyName/*: string*/,
  info/*: KeyedUnionInfo<T>*/
)/*: Cast<T>*/ => {
  const getCaster = (value) => {
    try {
      const key = castString(value[keyName]);
      const caster = info[key];
      if (!caster)
        throw new Error();
      return caster;
    } catch (error) {
      throw new InvalidKeyError(error, keyName, Object.keys(info));
    }
  };

  const keyedUnionCaster = (value) => {
    const valueObject = castObject(value);
    const caster = getCaster(valueObject);
    return caster(value);
  };
  return keyedUnionCaster;
};

export class InvalidConstantUnionError extends InvalidCastError {
  /*:: value: mixed*/
  /*:: constants: $ReadOnlyArray<mixed>*/

  constructor(value/*: mixed*/, constants/*: $ReadOnlyArray<mixed>*/) {
    super(`=(${getNameOfMixed(value)})`, `one of ${constants.toString()}`);
    this.constants = constants;
    this.value = value;
  }
}

export const createConstantUnionCaster = /*:: <T>*/(
  constants/*: $ReadOnlyArray<T>*/
)/*: Cast<T>*/ => {
  const constantUnionCaster = (value) => {
    const castedValue = constants.find(c => c === value);
    if (!castedValue)
      throw new InvalidConstantUnionError(value, constants);
    return castedValue;
  };

  return constantUnionCaster;
};

export const createNullableCaster = /*::<T>*/(
  caster/*: Cast<T>*/
)/*: Cast<?T>*/ => {
  const nullableCaster = (value) => {
    if (value === null)
      return null;
    if (value === undefined)
      return undefined;
    return caster(value);
  };
  return nullableCaster;
}