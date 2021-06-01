import { Equal, Expect } from '@type-challenges/utils'
import { ParseDocument, TrimStart } from '.'

type Html = `
  <div id=main>
    <span class="text-center">
      HTML parser!
    </span>
    <br>
  </div>
`
type AST = ParseDocument<TrimStart<Html>>
type VoidElementExample = ParseDocument<'<br>'>
type InvalidVoidElementExample = ParseDocument<'<div>'> // invalid HTML, so it's `never`
type UnquotedAttributeExample = ParseDocument<'<div id=main></div>'>
type SingleQuoteAttributeExample = ParseDocument<"<div id='main'></div>">
type DoubleQuoteAttributeExample = ParseDocument<'<div id="main"></div>'>
type SelfCloseTag = ParseDocument<'<div class="e" />'>
type NumericTagName = ParseDocument<'<2 a=b></2>'> // this is valid, not a bug
type PureText = ParseDocument<'custom text'>
type MultiTags =
  ParseDocument<'<h1 class="heading-1">1</h1><h2 class="heading-2">2</h2>'>

type Tests = [
  Expect<
    Equal<
      AST,
      [
        {
          name: 'div'
          attributes: [{ name: 'id'; value: 'main' }]
          children: [
            '    ',
            {
              name: 'span'
              attributes: [{ name: 'class'; value: 'text-center' }]
              children: ['      HTML parser!\n    ']
            },
            '    ',
            {
              name: 'br'
              attributes: []
              children: []
            },
            '  '
          ]
        },
        ''
      ]
    >
  >,
  Expect<
    Equal<
      VoidElementExample,
      [
        {
          name: 'br'
          attributes: []
          children: []
        }
      ]
    >
  >,
  Expect<Equal<InvalidVoidElementExample, never>>,
  Expect<
    Equal<
      UnquotedAttributeExample,
      [
        {
          name: 'div'
          attributes: [{ name: 'id'; value: 'main' }]
          children: []
        }
      ]
    >
  >,
  Expect<
    Equal<
      SingleQuoteAttributeExample,
      [
        {
          name: 'div'
          attributes: [{ name: 'id'; value: 'main' }]
          children: []
        }
      ]
    >
  >,
  Expect<
    Equal<
      DoubleQuoteAttributeExample,
      [
        {
          name: 'div'
          attributes: [{ name: 'id'; value: 'main' }]
          children: []
        }
      ]
    >
  >,
  Expect<
    Equal<
      SelfCloseTag,
      [
        {
          name: 'div'
          attributes: [{ name: 'class'; value: 'e' }]
          children: []
        }
      ]
    >
  >,
  Expect<
    Equal<
      NumericTagName,
      [
        {
          name: '2'
          attributes: [{ name: 'a'; value: 'b' }]
          children: []
        }
      ]
    >
  >,
  Expect<Equal<PureText, ['custom text']>>,
  Expect<
    Equal<
      MultiTags,
      [
        {
          name: 'h1'
          attributes: [{ name: 'class'; value: 'heading-1' }]
          children: ['1']
        },
        {
          name: 'h2'
          attributes: [{ name: 'class'; value: 'heading-2' }]
          children: ['2']
        }
      ]
    >
  >
]
