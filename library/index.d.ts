export type Cast<T> = (value: unknown) => T;

export const c: {
  lit: <T extends (string | number | boolean | Object)>(literal: T) => Cast<T>,
  obj: <T>(props: { [Property in keyof T]: Cast<T[Property]> }) => Cast<T>,
  arr: <T>(element: Cast<T>) => Cast<T[]>,
  tup: <T extends Array<any>>(elements: { [Property in keyof T ]: Cast<T[Property]> }) => Cast<T>

  str: Cast<string>,
  bool: Cast<boolean>,
  num: Cast<number>,

  maybe: <T>(caster: Cast<T>) => Cast<null | T>,
  enums: <T>(values: T) => Cast<T[keyof T]>,
  or: <T extends { [k: string]: Cast<any> }>(keyName: string, info: T) => Cast<{ [Prop in keyof T]: ReturnType<T[Prop]> }[keyof T]>,
}