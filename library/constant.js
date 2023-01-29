// @flow strict
/*:: import type { Cast } from './main.js'; */

export class InvalidConstantError extends Error {
  /*:: value: mixed*/
  /*:: constant: mixed*/

  constructor(value/*: mixed*/, constant/*: mixed*/) {
    const valueName = value && value.toString ? (value.toString/*: any*/)() : 'Value';
    const constantName = constant && constant.toString ? (constant.toString/*: any*/)() : 'Constant';
    super(`${valueName} is not ${constantName}`);
    this.value = value;
    this.constant = constant;
  }
}

export const createConstantCaster = /*:: <T>*/(constant/*: T*/)/*: Cast<T>*/ => {
  const caster = (value) => {
    if (value !== constant)
      throw new InvalidConstantError(value, constant);
    return constant;
  };
  return caster;
};