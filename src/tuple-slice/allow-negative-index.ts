type PositiveIndexSuffix<A extends any[], S extends number, C extends any[] = []> =
  C['length'] extends S ? A :
  A extends [infer F, ...infer R] ? PositiveIndexSuffix<R, S, [...C, F]> : never

type NegativeIndexSuffix<A extends any[], S extends number, C extends any[] = []> =
  `-${C['length']}` extends `${S}` ? C :
  A extends [...infer I, infer T] ? NegativeIndexSuffix<I, S, [T, ...C]> : never

type Suffix<A extends any[], S extends number> =
  A extends [] ? [] :
  `${S}` extends `-${infer _}` ?
  NegativeIndexSuffix<A, S> : PositiveIndexSuffix<A, S>

export type Slice<
  A extends any[],
  Start extends number = 0,
  End extends number = A['length'],
  > = Suffix<A, Start> extends [...infer M, ...Suffix<A, End>] ? M : never
