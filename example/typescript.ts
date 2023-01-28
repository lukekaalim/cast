import { c } from '@lukekaalim/cast';

const b = c.lit('cat')

const a = b('anything')

const d = c.obj({ alpha: c.lit('bee' )})

const e = d('anything');

e.alpha


const l = c.tup<['a', 'b']>([c.lit('a'), c.lit('b')]);

const m = l('anything');

m[0]

const f = c.or('keything', {
  lego: c.obj({ type: c.lit('one'), beta: c.num }),
  orange: c.obj({ type: c.lit('two'), gamme: c.num })
})

const g = f('moo')

