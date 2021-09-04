// @flow strict

export const getNameOfMixed = (value/*: mixed*/)/*: string*/ => {
  if (value === null)
    return `null`;
  if (value === undefined)
    return `undefined`;
  switch (typeof value) {
    case 'object':
      return value.toString();
    case 'number':
      return `the number ${value.toString()}`;
    case 'boolean':
      return `the boolean ${value.toString()}`;
    case 'string':
      return value;
    default:
      throw new Error(`Unknown object type`);
  }
};