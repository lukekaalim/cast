// @flow strict
/*:: import type { Cast } from '@lukekaalim/cast'; */
const { toObject, toBoolean, toArray, string, toEnum, toNumber, fromProp, fromObject, castObject } = require('@lukekaalim/cast');

/*::
type ExampleUser = {
  name: string,
  id: number,
  isAdmin: boolean,
  location: 'australia' | 'new-zealand' | 'tasmania',
  middleNames: string[],
}

type Profile = {
  user: ExampleUser,
}
*/

const toExampleUser/*: Cast<ExampleUser>*/ = castObject(prop => ({
  name: prop('name', string),
  id: prop('id', toNumber),
  isAdmin: prop('isAdmin', toBoolean),
  location: 'australia',
  middleNames: [],
}));

const toProfile/*: Cast<Profile>*/ = castObject(prop => ({
  user: prop('user', toExampleUser)
}));

const createExampleUser/*: Cast<ExampleUser>*/ = (value) => {
  const object = toObject(value);
  return {
    name: fromProp(object, 'name', string),
    id: toNumber(object.id),
    isAdmin: toBoolean(object.isAdmin),
    location: toEnum(object.location, ['australia']),
    middleNames: toArray(object.middleNames).map(string),
  }
};

const lukeUser = createExampleUser({
  name: 'luke',
  id: 1,
  isAdmin: true,
  location: 'australia',
  middleNames: ['martin', 'anthony'],
});

console.log(lukeUser);