// @flow strict
/*::
import type { Cast } from '@lukekaalim/cast';
*/
import {
  createObjectCaster, createArrayCaster, castConstant,
  castString, createConstantUnionCaster, createKeyedUnionCaster,
  createConstantCaster,
  castNumber
} from "@lukekaalim/cast";


/*::
type Cat = {
  type: 'cat',
  name: string,
  age: number,
  fur: 'brown' | 'cream' | 'dark'
}
type Lizard = {
  type: 'lizard',
  name: string,
  age: number,
  scales: 'green' | 'red'
}
type Pet =
  | Cat
  | Lizard

type PetStore = {
  pets: Pet[],
};
*/
const catTypeCaster = createConstantCaster('cat');
const castFur = createConstantUnionCaster(['brown', 'cream', 'dark']);

const castCat/*: Cast<Cat>*/ = createObjectCaster(prop => ({
  type: prop('type', catTypeCaster),
  name: prop('name', castString),
  fur: prop('fur', castFur),
  age: prop('age', castNumber)
}))

const castPet/*: Cast<Pet>*/ = createKeyedUnionCaster('type', {
  'cat': castCat,
  'lizard': () => { throw new Error(`NO LAZARD`); },
});

const castPets/*: Cast<$ReadOnlyArray<Pet>>*/ = createArrayCaster(castPet);

try {
  const pets = castPets([
    {
      type: 'cat',
      name: 'lucas',
      fur: 'cream',
      age: 1
    },
    {
      type: 'cat',
      name: 'geores',
      fur: 'brown',
      age: 1
    },
    {
      type: null
    }
  ]);
  
  console.log(pets);
} catch (error) {
  console.log('Error:', error.message);
}
