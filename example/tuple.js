// @flow strict
/*:: import type { Cast } from '@lukekaalim/cast'; */
import { createTupleCaster, createConstantCaster, createObjectCaster, castString, castNumber, castObject } from '@lukekaalim/cast'; 


const castImplicitTuple = createTupleCaster([
  createConstantCaster/*:: <'yes'>*/('yes'),
  castString,
  castNumber,
  castObject,
]);

const [a, b, c, d] = castImplicitTuple(100)

/*::
type ExplicitTuple = ['no', number, string, { prop: string }];
*/

const castExplicitTuple/*: Cast<ExplicitTuple>*/ = createTupleCaster([
  createConstantCaster('no'),
  castNumber,
  castString,
  createObjectCaster({
    prop: castString,
  })
]);

const [e, f, g, h] = castExplicitTuple(100);
