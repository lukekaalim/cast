// @flow strict
/*:: import type { Cast } from './main'; */
import { castArray, castObject, InvalidTypeError } from './primitives.js';
import { castEnum, InvalidEnumError } from './utility.js';
import { InvalidCastError } from './error.js';


export const createTupleCaster = /*:: <A: any>*/(
  elements/*: A*/
)/*: Cast<$TupleMap<A, <X>(a: Cast<X>) => X>>*/ => {
  const tupleCaster = (value) => {
    const array = castArray(value);
    return array.map((v, i) => elements[i](v));
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

export const createObjectCaster = /*:: <T: {}>*/ (
  props/*: T */
)/*: Cast<$ObjMap<T, <P>(i: Cast<P>) => P>>*/ => {
  const propCasters = Object.entries((props/*: any*/));

  const castForProp = (name, caster, value) => {
    try {
      return (caster/*: any*/)(value)
    } catch (error) {
      throw new InvalidPropError(name, error);
    }
  }
  const castObjectProps = (value)/*: any*/ => {
    const objectValue = castObject(value);
    const valueProps = propCasters.map(([name, caster]) => [name, castForProp(name, caster, objectValue[name])])
    return Object.fromEntries(valueProps);
  };
  return castObjectProps;
};
