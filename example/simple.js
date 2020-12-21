// @flow strict
/*:: import type { Cast } from '@lukekaalim/cast'; */
const { toObject, toBoolean, toArray, toString, toEnum, toNumber } = require('@lukekaalim/cast');

/*::
type ExampleUser = {
  name: string,
  id: number,
  isAdmin: boolean,
  location: 'australia' | 'new-zealand' | 'tasmania',
  middleNames: string[],
}
*/

const createExampleUser/*: Cast<ExampleUser>*/ = (value) => {
  const object = toObject(value);
  return {
    name: toString(object.name),
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