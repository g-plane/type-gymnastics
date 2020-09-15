type Suffix<A extends any[], S extends number, C extends any[] = []> =
  A extends [] ? [] :
  C['length'] extends S ? A :
  A extends [infer F, ...infer R] ? Suffix<R, S, [...C, F]> : never

export type Slice<
  A extends any[],
  Start extends number = 0,
  End extends number = A['length'],
  > = Suffix<A, Start> extends [...infer M, ...Suffix<A, End>] ? M : never
