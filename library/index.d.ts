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
  enums: <T extends string>(values: T[]) => Cast<T>,

  or: <T extends { [k: string]: Cast<unknown> }>(keyName: string, values: T) => Cast<ReturnType<T[keyof T]>>,
}

export namespace Utils {
  export type CastMap<T> = { [k: string]: Cast<T> }
}
