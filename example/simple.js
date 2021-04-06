// @flow strict
/*:: import type { Cast } from '@lukekaalim/cast'; */
const { toObject, toBoolean, toArray, toString, toEnum, toNumber, fromProp, fromObject, castObject } = require('@lukekaalim/cast');

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
  name: prop('name', toString),
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
    name: fromProp(object, 'name', toString),
    id: toNumber(object.id),
    isAdmin: toBoolean(object.isAdmin),
    location: toEnum(object.location, [('australia'/*: 'australia'*/), ('new-zealand'/*: 'new-zealand'*/), ('tasmania'/*: 'tasmania'*/)]),
    middleNames: toArray(object.middleNames).map(toString),
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