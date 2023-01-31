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

export const createKeyedUnionCaster = /*:: <T: { [string]: Cast<any> }>*/(
  keyName/*: string*/,
  info/*: T*/
)/*: Cast<$Values<$ObjMap<T, <V>(v: Cast<V>) => V>>>*/ => {
  const getKey = (value) => {
    const key = castString(value[keyName]);
    return key;
  };
  const getCaster = (key, value) => {
    try {
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
    const key = getKey(valueObject);
    const caster = getCaster(key, valueObject);
    return { ...caster(value), [keyName]: key };
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
)/*: Cast<null | T>*/ => {
  const nullableCaster = (value) => {
    if (value === null)
      return null;
    if (value === undefined)
      return null;
    return caster(value);
  };
  return nullableCaster;
}

export const createLinearUnionCaster = /*:: <T>*/(
  casters/*: Cast<T>[]*/,
)/*: Cast<T>*/ => {
  const caster = (value) => {
    for (const cast of casters) {
      try {
        return cast(value)
      } catch (error) {}
    }
    throw new InvalidCastError(
      JSON.stringify(value) || 'value',
      'one of union',
      `none of the union casters returned without throwing an error`
    );
  }
  return caster;
};