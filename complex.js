// @flow strict
/*:: import type { Cast } from './main'; */
import { castArray, castObject, InvalidTypeError } from './primitives.js';
import { castEnum, InvalidEnumError } from './utility.js';
import { InvalidCastError } from './error.js';

export const createTupleCaster = /*:: <A, B>*/(
  toA/*: Cast<A>*/,
  toB/*: Cast<B>*/
)/*: Cast<[A, B]>*/ => {
  const tupleCaster = (value) => {
    const array = castArray(value);
    const [tupleA, tupleB] = array;
    return [toA(tupleA), toB(tupleB)];
  }
  return tupleCaster;
};

class InvalidArrayElementError extends InvalidCastError {
  /*:: cause: Error*/
  /*:: index: number*/

  constructor(cause/*: Error*/, index/*: number*/) {
    if (cause instanceof InvalidCastError)
      super(`[${index}]${cause.subjectDescription}`, cause.targetDescription, cause.causeDescription);
    else
      super(`[${index}]`, `valid element`, cause.message);

    this.cause = cause;
    this.index = index;
  }
}

export const createArrayCaster = /*:: <T>*/(toElement /*: Cast<T>*/)/*: Cast<$ReadOnlyArray<T>>*/ => {
  const arrayCaster = (value) => {
    const array = castArray(value);
    return array.map((value, index) => {
      try {
        return toElement(value);
      } catch (error) {
        throw new InvalidArrayElementError(error, index);
      }
    });
  };
  return arrayCaster;
};

class InvalidPropError extends InvalidCastError {
  /*:: cause: Error*/
  /*:: propName: string*/

  constructor(propName/*: string*/, cause/*: Error*/) {
    if (cause instanceof InvalidCastError)
      super(`.${propName}${cause.subjectDescription}`, cause.targetDescription, cause.causeDescription)
    else
      super(`.${propName}`, `valid prop`, cause.message);
    this.cause = cause;
    this.propName = propName;
  }
}

export const createObjectCaster = /*:: <T>*/ (
  toValue/*: (
    prop: <X>(name: string, toValue: mixed => X) => X,
    object: { +[string]: mixed },
  ) => T*/,
)/*: Cast<T>*/ => (value) => {
  const object = castObject(value);
  const prop = /*:: <X>*/(name/*: string*/, toValue/*: mixed => X*/)/*: X*/ => {
    try {
      return toValue(object[name])
    } catch (error) {
      throw new InvalidPropError(name, error);
    }
  }
  return toValue(prop, object);
};
