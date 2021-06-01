type ParseProtocol<I, AST> = I extends `${infer P}://${infer Rest}`
  ? [AST & { protocol: P }, Rest]
  : []

type ParseAuth<I, AST> = I extends `${infer A}@${infer Rest}`
  ? A extends ''
    ? []
    : A extends `${infer U}:${infer P}`
    ? U extends ''
      ? []
      : [AST & { username: U; password: P }, Rest]
    : [AST & { username: A }, Rest]
  : [AST, I]

type ParseHost<I, AST> = I extends `${infer H}/${infer Rest}`
  ? ParseHostnameAndPort<H> extends infer Host
    ? Host extends []
      ? []
      : [AST & Host, Rest]
    : never
  : ParseHostnameAndPort<I> extends infer Host
  ? Host extends []
    ? []
    : [AST & Host, '']
  : never
type ParseHostnameAndPort<I> = I extends `${infer Name}:${infer Port}`
  ? ParsePort<Port> extends infer Port
    ? Port extends []
      ? []
      : { hostname: Name; port: Port }
    : never
  : { hostname: I }
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type ParsePort<I, O extends string = ''> = I extends ''
  ? O
  : I extends `${Digit}${infer Rest}`
  ? I extends `${infer Char}${Rest}`
    ? ParsePort<Rest, `${O}${Char}`>
    : never
  : []

type ParsePathname<I, AST> = I extends `${infer P}?${infer Rest}`
  ? [AST & { pathname: `/${P}` }, `?${Rest}`]
  : I extends `${infer P}#${infer Rest}`
  ? [AST & { pathname: `/${P}` }, `#${Rest}`]
  : I extends string
  ? [AST & { pathname: `/${I}` }, '']
  : never

type ParseQuery<I, AST> = I extends `?${infer Q}#${infer Rest}`
  ? [AST & { query: ParseQueryItems<Q> }, `#${Rest}`]
  : I extends `?${infer Q}`
  ? [AST & { query: ParseQueryItems<Q> }, '']
  : [AST, I]
type ParseQueryItems<I> = string extends I
  ? []
  : I extends ''
  ? []
  : I extends `${infer K}=${infer V}&${infer Rest}`
  ? [{ key: K; value: V }, ...ParseQueryItems<Rest>]
  : I extends `${infer K}&${infer Rest}`
  ? [{ key: K; value: null }, ...ParseQueryItems<Rest>]
  : I extends `${infer K}=${infer V}`
  ? [{ key: K; value: V }]
  : I extends `${infer K}`
  ? [{ key: K; value: null }]
  : []

type ParseHash<I, AST> = I extends `#${infer H}` ? AST & { hash: `#${H}` } : AST

export type ParseURL<I extends string> = ParseProtocol<I, {}> extends [
  infer AST,
  infer Rest
]
  ? ParseAuth<Rest, AST> extends [infer AST, infer Rest]
    ? ParseHost<Rest, AST> extends [infer AST, infer Rest]
      ? ParsePathname<Rest, AST> extends [infer AST, infer Rest]
        ? ParseQuery<Rest, AST> extends [infer AST, infer Rest]
          ? ParseHash<Rest, AST> extends infer AST
            ? { [P in keyof AST as AST[P] extends '' ? never : P]: AST[P] }
            : never
          : never
        : never
      : never
    : never
  : never
