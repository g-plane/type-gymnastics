import { Equal, Expect } from '@type-challenges/utils'
import { ParseURL } from '.'

type Result =
  ParseURL<'https://username:password@example.com:443/p/a/t/h?k1=v1&k2=v2#h'>

type Tests = [
  Expect<
    Equal<
      Result,
      {
        protocol: 'https'
        username: 'username'
        password: 'password'
        hostname: 'example.com'
        port: '443'
        pathname: '/p/a/t/h'
        query: [{ key: 'k1'; value: 'v1' }, { key: 'k2'; value: 'v2' }]
        hash: '#h'
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/'
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/'
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://127.0.0.1/'>,
      {
        protocol: 'https'
        hostname: '127.0.0.1'
        pathname: '/'
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://u@example.com'>,
      {
        protocol: 'https'
        username: 'u'
        hostname: 'example.com'
        pathname: '/'
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://u:p@example.com'>,
      {
        protocol: 'https'
        username: 'u'
        password: 'p'
        hostname: 'example.com'
        pathname: '/'
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com:443/'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        port: '443'
        pathname: '/'
      }
    >
  >,
  Expect<Equal<ParseURL<'https://example.com:443a/'>, never>>,
  Expect<Equal<ParseURL<'https://example.com:ab/'>, never>>,
  Expect<
    Equal<
      ParseURL<'https://example.com/p/a/t/h?k1=v1&k2=v2#h'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/p/a/t/h'
        query: [{ key: 'k1'; value: 'v1' }, { key: 'k2'; value: 'v2' }]
        hash: '#h'
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/p/a/t/h?k1=v1&k2=v2'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/p/a/t/h'
        query: [{ key: 'k1'; value: 'v1' }, { key: 'k2'; value: 'v2' }]
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/p/a/t/h#hash'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/p/a/t/h'
        hash: '#hash'
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/p/a/t/h'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/p/a/t/h'
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/?k1=v1&k2=v2'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/'
        query: [{ key: 'k1'; value: 'v1' }, { key: 'k2'; value: 'v2' }]
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/?k1=v1&k2'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/'
        query: [{ key: 'k1'; value: 'v1' }, { key: 'k2'; value: null }]
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/?k1&k2=v2'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/'
        query: [{ key: 'k1'; value: null }, { key: 'k2'; value: 'v2' }]
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/?k1&k2'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/'
        query: [{ key: 'k1'; value: null }, { key: 'k2'; value: null }]
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/?k1=v1'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/'
        query: [{ key: 'k1'; value: 'v1' }]
      }
    >
  >,
  Expect<
    Equal<
      ParseURL<'https://example.com/#hash'>,
      {
        protocol: 'https'
        hostname: 'example.com'
        pathname: '/'
        hash: '#hash'
      }
    >
  >,
  Expect<Equal<ParseURL<'https'>, never>>,
  Expect<Equal<ParseURL<'https://@example.com/'>, never>>,
  Expect<Equal<ParseURL<'https://:p@example.com/'>, never>>
]
