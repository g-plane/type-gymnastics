type ParseProtocol<I, AST> =
    I extends `${infer P}://${infer Rest}` ? [AST & { protocol: P }, Rest] : never

type ParseAuth<I, AST> =
    I extends `${infer A}@${infer Rest}` ?
    A extends `${infer U}:${infer P}` ? [AST & { username: U, password: P }, Rest] :
    [AST & { username: A }, Rest] : [AST, I]

type ParseHost<I, AST> =
    I extends `${infer H}/${infer Rest}` ?
    H extends `${infer Name}:${infer Port}` ?
    ParsePort<Port> extends never ? never :
    ParsePort<Port> extends infer Port ?
    [AST & { hostname: Name, port: Port }, Rest] :
    [AST & { hostname: H }, Rest] :
    never : never
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type ParsePort<I, O extends string = ''> =
    I extends '' ? O :
    I extends `${Digit}${infer Rest}` ?
    I extends `${infer Char}${Rest}` ?
    ParsePort<Rest, `${O}${Char}`> :
    never : never

type ParsePathname<I, AST> =
    I extends `${infer P}?${infer Rest}` ? [AST & { pathname: `/${P}` }, `?${Rest}`] :
    I extends `${infer P}#${infer Rest}` ? [AST & { pathname: `/${P}` }, `#${Rest}`] :
    I extends `${infer P}` ? [AST & { pathname: `/${P}` }, ''] : never

type ParseQuery<I, AST> =
    I extends `?${infer Q}#${infer Rest}` ? [AST & { query: ParseQueryItems<Q> }, `#${Rest}`] :
    I extends `?${infer Q}` ? [AST & { query: ParseQueryItems<Q> }, ''] : [AST, I]
type ParseQueryItems<I> =
    string extends I ? [] :
    I extends '' ? [] :
    I extends `${infer K}=${infer V}&${infer Rest}` ? [{ key: K, value: V }, ...ParseQueryItems<Rest>] :
    I extends `${infer K}&${infer Rest}` ? [{ key: K, value: null }, ...ParseQueryItems<Rest>] :
    I extends `${infer K}=${infer V}` ? [{ key: K, value: V }] :
    I extends `${infer K}` ? [{ key: K, value: null }] : []

type ParseHash<I, AST> =
    I extends `#${infer H}` ? [AST & { hash: `#${H}` }] : [AST]

type ParseURL<I extends string> =
    ParseProtocol<I, {}> extends [infer AST, infer Rest] ?
    ParseAuth<Rest, AST> extends [infer AST, infer Rest] ?
    ParseHost<Rest, AST> extends [infer AST, infer Rest] ?
    ParsePathname<Rest, AST> extends [infer AST, infer Rest] ?
    ParseQuery<Rest, AST> extends [infer AST, infer Rest] ?
    ParseHash<Rest, AST> extends [infer AST] ? AST :
    never : never : never : never : never : never

type Merge<T> = { [P in keyof T as T[P] extends '' ? never : P]: T[P] }

type Result = Merge<ParseURL<'https://username:password@example.com:443/p/a/t/h?k1=v1&k2=v2#h'>>
