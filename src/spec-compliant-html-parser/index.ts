type Whitespace = '\u0009' | '\u000a' | '\u000c' | '\u000d' | '\u0020'
type LowerAlpha =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
type UpperAlpha = Uppercase<LowerAlpha>
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type TrimStart<S> = S extends ''
  ? ''
  : S extends `${Whitespace}${infer Rest}`
  ? TrimStart<Rest>
  : S

type ParseAttributes<I, Attrs extends any[]> = I extends ` ${infer Rest}`
  ? ParseAttributes<Rest, Attrs>
  : I extends `>${infer _}`
  ? [Attrs, I]
  : I extends `/${infer _}`
  ? [Attrs, I]
  : ParseAttribute<I> extends [infer Attr, infer Rest]
  ? ParseAttributes<Rest, [...Attrs, Attr]>
  : never

type ParseAttribute<I> = ParseAttributeName<I, ''> extends [
  infer Name,
  infer Rest
]
  ? Name extends ''
    ? never
    : TrimStart<Rest> extends infer Rest
    ? Rest extends `=${infer Rest}`
      ? ParseAttributeValue<TrimStart<Rest>> extends [infer Value, infer Rest]
        ? [{ name: Name; value: Value }, Rest]
        : never
      : [{ name: Name; value: true }, Rest]
    : never
  : never

type ParseAttributeName<I, N extends string> = I extends ''
  ? ''
  : I extends `${infer Head}${infer Rest}`
  ? Head extends ' ' | "'" | '"' | '>' | '/' | '='
    ? [N, `${Head}${Rest}`]
    : ParseAttributeName<Rest, `${N}${Head}`>
  : never

type ParseAttributeValue<I> = I extends `"${infer Value}"${infer Rest}`
  ? [Value, Rest]
  : I extends `'${infer Value}'${infer Rest}`
  ? [Value, Rest]
  : ParseAttributeValueNoQuote<I, ''> extends [infer Value, infer Rest]
  ? Value extends ''
    ? never
    : [Value, Rest]
  : never

type ParseAttributeValueNoQuote<I, O extends string> = I extends ''
  ? [O, I]
  : I extends `${infer Head}${infer Rest}`
  ? Head extends Whitespace | '"' | "'" | '=' | '<' | '>' | '`'
    ? [O, `${Head}${Rest}`]
    : ParseAttributeValueNoQuote<Rest, `${O}${Head}`>
  : never

type ParseStartTag<I> = I extends `<${infer Rest}`
  ? ParseTagName<Rest, ''> extends [infer TagName, infer Rest]
    ? TagName extends ''
      ? never
      : [TagName, Rest]
    : never
  : never

type ParseEndTag<I> = I extends `</${infer Rest}`
  ? ParseTagName<Rest, ''> extends [infer TagName, infer Rest]
    ? TrimStart<Rest> extends `>${infer Rest}`
      ? [TagName, Rest]
      : never
    : never
  : never

type TagNameChars = LowerAlpha | UpperAlpha | Digit
type ParseTagName<I, N extends string> = I extends ''
  ? N
  : I extends `${infer Head}${infer Rest}`
  ? N extends ''
    ? Head extends TagNameChars
      ? ParseTagName<Rest, Head>
      : never
    : Head extends TagNameChars | '-'
    ? ParseTagName<Rest, `${N}${Head}`>
    : [N, `${Head}${Rest}`]
  : never

type ParseText<I, T extends string> = I extends ''
  ? [TrimFirstNewline<T>, I]
  : I extends `</${infer _}`
  ? [TrimFirstNewline<T>, I]
  : I extends `<${TagNameChars}${infer _}`
  ? [TrimFirstNewline<T>, I]
  : I extends `${infer Head}${infer Rest}`
  ? ParseText<Rest, `${T}${Head}`>
  : never
type TrimFirstNewline<S> = S extends `\r\n${infer Rest}`
  ? Rest
  : S extends `\n${infer Rest}`
  ? Rest
  : S extends `\r${infer Rest}`
  ? Rest
  : S

type VoidElement =
  | 'area'
  | 'base'
  | 'br'
  | 'col'
  | 'embed'
  | 'hr'
  | 'img'
  | 'input'
  | 'link'
  | 'meta'
  | 'param'
  | 'source'
  | 'track'
  | 'wbr'
type ParseTag<I> = ParseStartTag<I> extends [infer TagName, infer Rest]
  ? ParseAttributes<Rest, []> extends [infer Attributes, infer Rest]
    ? Rest extends `/>${infer Rest}`
      ? [{ name: TagName; attributes: Attributes; children: [] }, Rest]
      : Rest extends `>${infer Rest}`
      ? TagName extends VoidElement
        ? [{ name: TagName; attributes: Attributes; children: [] }, Rest]
        : ParseChildren<Rest, []> extends [infer Children, infer Rest]
        ? ParseEndTag<Rest> extends [infer EndTagName, infer Rest]
          ? EndTagName extends TagName
            ? [
                { name: TagName; attributes: Attributes; children: Children },
                Rest
              ]
            : never
          : never
        : never
      : never
    : never
  : never

type ParseChildren<I, Children extends any[]> = string extends I
  ? never
  : I extends ''
  ? [Children]
  : I extends `<${TagNameChars}${infer _}`
  ? ParseTag<I> extends [infer Tag, infer Rest]
    ? ParseChildren<Rest, [...Children, Tag]>
    : never
  : I extends `</${TagNameChars}${infer _}`
  ? [Children, I]
  : ParseText<I, ''> extends [infer Text, infer Rest]
  ? ParseChildren<Rest, [...Children, Text]>
  : never

export type ParseDocument<I> = ParseChildren<I, []>[0]
