// @flow strict
/*:: import type { Cast } from './main'; */
const { toObject } = require("./primitives");

const toConstant = /*:: <T>*/(value/*: mixed*/, constant/*: T*/)/*: T*/ => {
  if (constant !== value)
    throw new TypeError();
  return constant;
};
const toEnum = /*:: <T: mixed[]>*/(value/*: mixed*/, options/*: T*/)/*: $ElementType<T, number>*/ => {
  const enumIndex = options.indexOf(value);
  if (enumIndex === -1)
    throw new TypeError();
  return options[enumIndex];
};
const toNullable = /*::<T>*/(value/*: mixed*/, toValue/*: mixed => T*/)/*: null | T*/ => {
  if (value === null)
    return null;
  return toValue(value);
}

class PropertyError extends TypeError {
  /*:: rootError: Error*/
  constructor(message/*: string*/, rootError/*: Error*/) {
    super(message + '\n' + rootError.message);
    this.rootError = rootError;
  }
}
const fromObjectProperty = /*:: <T>*/(value/*: mixed*/, propertyName/*: string*/, toValue/*: mixed => T*/)/*: T*/ => {
  try {
    const object = toObject(value);
    return toValue(object[propertyName])
  } catch (error) {
    throw new PropertyError(`"${propertyName}" was not expected value in object`, error)
  }
}
const fromObject = /*:: <T>*/(value/*: mixed*/, toValue/*: (prop: <X>(name: string, toValue: mixed => X) => X) => T*/)/*: T*/ => {
  const object = toObject(value);
  const prop = /*:: <X>*/(name/*: string*/, toValue/*: mixed => X*/)/*: X*/ => {
    return toValue(object[name])
  }
  return toValue(prop);
};

const castObject = /*:: <T>*/ (
  toValue/*: (
    prop: <X>(name: string, toValue: mixed => X) => X,
    object: { +[string]: mixed },
  ) => T*/,
)/*: Cast<T>*/ => (value) => {
  const object = toObject(value);
  const prop = /*:: <X>*/(name/*: string*/, toValue/*: mixed => X*/)/*: X*/ => {
    return toValue(object[name])
  }
  return toValue(prop, object);
};

module.exports = {
  toConstant,
  toEnum,
  toNullable,
  fromObjectProperty,
  fromProp: fromObjectProperty,
  fromObject,
  castObject,
}