// @flow strict
/*:: import type { Cast } from '@lukekaalim/cast'; */
import { createObjectCaster, createArrayCaster, castString, castNumber } from '@lukekaalim/cast';

/*::
type Node = {
  name: string,
  children: $ReadOnlyArray<Node>,
};
*/

const castNode/*: Cast<Node>*/ = createObjectCaster({
  name: castString,
  children: v => castChildren(v)
});
const castChildren = createArrayCaster(castNode);

try {
  const root = castNode({
    name: 'root',
    children: [
      {
        name: 'first',
        children: [],
      },
      {
        nme: 'second',
        children: []
      }
    ],
  });
  console.log(root);
} catch (error) {
  console.log(error.message);
  console.error(error);
}


