type IsIncludes<Items extends any[], Search> =
  Items extends [] ? false :
  Items extends [infer I, ...infer Rest] ?
  I extends Search ? true : IsIncludes<Rest, Search> : never

type ParseQueryString<I, Query extends Record<string, any[]> = {}> =
  string extends I ? Record<string, any> :
  I extends '' ? { [P in keyof Query]: Query[P]['length'] extends 1 ? Query[P][0] : Query[P] } :
  I extends `${infer K}=${infer V}&${infer Rest}` ? ParseQueryString<Rest, MergeQuery<K, V, Query>> :
  I extends `${infer K}&${infer Rest}` ? ParseQueryString<Rest, MergeQuery<K, true, Query>> :
  I extends `${infer K}=${infer V}` ? ParseQueryString<'', MergeQuery<K, V, Query>> :
  I extends `${infer K}` ? ParseQueryString<'', MergeQuery<K, true, Query>> : []

type MergeQuery<K extends string, V, T extends Record<string, any[]>> =
  K extends keyof T ?
  IsIncludes<T[K], V> extends true ? T :
  Omit<T, K> & { [P in K]: [...T[P], V] } :
  T & { [P in K]: [V] }

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
