// @flow strict
/*:: import type { Cast } from '@lukekaalim/cast'; */
import { c } from '@lukekaalim/cast';

const castLongObject = c.obj({
  type: c.lit('Cool type bro!'),
  nested: c.obj({
    anotherLayer: c.str,
    count: c.num,
    letsHearIt: c.arr(c.obj({ forTheBoys: c.tup(['dave', 'charles', 'michael']) })),
    oops: c.maybe(c.or('type', {
      'let': c.obj({ type: c.lit('let'), let: c.lit('my people go!')})
    }))
  })
})

const castKeys/*: Cast<{| type: 'a', cool: string |} | {| type: 'b', tight: {| mayhem: string |} |}>*/ = c.or('type', {
  'a': c.obj({ type: c.lit('a'), cool: c.str }),
  'b': c.obj({ type: c.lit('b'), tight: c.obj({ mayhem: c.str }) }),
  //'d': c.obj({ type: c.lit('d'), whassup: c.str }),
});

const gate = (input/*: ?'my people go!'*/) => {
  return true;
}

const main = () => {
  try {
    const long = castLongObject({});
    long.nested.letsHearIt.map(d => d.forTheBoys)
    gate(long.nested.oops?.let)

    const keys = castKeys({});
  } catch (error) {
    console.log(error);
  }
};

main;