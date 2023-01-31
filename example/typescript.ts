import { c, Utils } from '@lukekaalim/cast';

const b = c.lit('cat')

const a = b('anything')

const d = c.obj({ alpha: c.lit('bee' )})

const e = d('anything');

e.alpha


const l = c.tup<['a', 'b']>([c.lit('a'), c.lit('b')]);

const m = l('anything');

m[0]

type Switchy =
  | { type: 'one', beta: number }
  | { type: 'two', gamme: number }

const f = c.or<Utils.CastMap<Switchy>>('keything', {
  lego: c.obj({ type: c.lit('one'), beta: c.num }),
  orange: c.obj({ type: c.lit('two'), gamme: c.lit(10) })
})

const g = f('moo')
if (g.type === 'one')
  g.beta;

type Greets = 'hello' | 'world';

const en = c.enums<Greets>(['hello', 'world']);
const ena = en('what')
ena[0];

const h = c.any<'hello' | 'world' | boolean>([c.lit('hello'), c.lit('world'), c.bool]);
const ha = h('dsg')