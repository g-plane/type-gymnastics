export enum Comparison {
  Greater,
  Equal,
  Lower,
}

type IntTuple<X extends string, Acc extends number[] = []> =
  `${Acc['length']}` extends `${X}` ? Acc : IntTuple<X, [...Acc, Acc['length']]>

type _Comparator<A extends string, B extends string> = A extends B
  ? Comparison.Equal
  : `${A}` extends `-${infer A}`
  ? `${B}` extends `-${infer B}`
    ? _Comparator<B, A>
    : Comparison.Lower
  : `${B}` extends `-${infer _}`
  ? Comparison.Greater
  : IntTuple<A> extends [...IntTuple<B>, ...infer _]
  ? Comparison.Greater
  : Comparison.Lower

export type Comparator<A extends number, B extends number> = _Comparator<
  `${A}`,
  `${B}`
>
