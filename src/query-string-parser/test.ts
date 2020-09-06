import { Equal, Expect } from '@type-challenges/utils'
import { ParseQueryString } from '.'

type Example1 = ParseQueryString<''>
type Example2 = ParseQueryString<'k1'>
type Example3 = ParseQueryString<'k1&k1'>
type Example4 = ParseQueryString<'k1&k2'>
type Example5 = ParseQueryString<'k1=v1'>
type Example6 = ParseQueryString<'k1=v1&k1=v2'>
type Example7 = ParseQueryString<'k1=v1&k2=v2'>
type Example8 = ParseQueryString<'k1=v1&k2=v2&k1=v2'>
type Example9 = ParseQueryString<'k1=v1&k2'>
type Example10 = ParseQueryString<'k1=v1&k1=v1'>

type Tests = [
  Expect<Equal<Example1, {}>>,
  Expect<Equal<Example2, { k1: true }>>,
  Expect<Equal<Example3, { k1: true }>>,
  Expect<Equal<Example4, { k1: true, k2: true }>>,
  Expect<Equal<Example5, { k1: 'v1' }>>,
  Expect<Equal<Example6, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<Example7, { k1: 'v1', k2: 'v2' }>>,
  Expect<Equal<Example8, { k1: ['v1', 'v2'], k2: 'v2' }>>,
  Expect<Equal<Example9, { k1: 'v1', k2: true }>>,
  Expect<Equal<Example10, { k1: 'v1' }>>,
]
