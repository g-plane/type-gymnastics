type ControlsMap = {
  c: 'char',
  s: 'string',
  d: 'dec',
  o: 'oct',
  h: 'hex',
  f: 'float',
  p: 'pointer',
}

type ParseControl<I> =
  I extends '' ? [false, I] :
  I extends `${infer Char}${infer Rest}` ?
  Char extends keyof ControlsMap ? [ControlsMap[Char], Rest] :
  [false, Rest] : never

type ParsePrintFormat<I, Placeholders extends any[] = []> =
  I extends '' ? Placeholders :
  I extends `${infer Head}${infer Rest}` ?
  Head extends '%' ?
  ParseControl<Rest> extends [infer Control, infer Rest] ?
  Control extends false ? ParsePrintFormat<Rest, Placeholders> :
  ParsePrintFormat<Rest, [...Placeholders, Control]> : never :
  ParsePrintFormat<Rest, Placeholders> : never

type Example1 = ParsePrintFormat<''>
type Example2 = ParsePrintFormat<'Any string'>
type Example3 = ParsePrintFormat<'The result is %d.'>
type Example4 = ParsePrintFormat<'The result is %%d.'>
type Example5 = ParsePrintFormat<'The result is %%%d.'>
type Example6 = ParsePrintFormat<'The result is %f.'>
type Example7 = ParsePrintFormat<'The result is %h.'>
type Example8 = ParsePrintFormat<'Hello %s: score is %d.'>
type Example9 = ParsePrintFormat<'The result is %'>
