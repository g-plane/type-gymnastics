type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

type ParseControl<I> = I extends ''
  ? [false, I]
  : I extends `${infer Char}${infer Rest}`
  ? Char extends keyof ControlsMap
    ? [ControlsMap[Char], Rest]
    : [false, Rest]
  : never

export type ParsePrintFormat<I, Placeholders extends any[] = []> = I extends ''
  ? Placeholders
  : I extends `${infer Head}${infer Rest}`
  ? Head extends '%'
    ? ParseControl<Rest> extends [infer Control, infer Rest]
      ? Control extends false
        ? ParsePrintFormat<Rest, Placeholders>
        : ParsePrintFormat<Rest, [...Placeholders, Control]>
      : never
    : ParsePrintFormat<Rest, Placeholders>
  : never
