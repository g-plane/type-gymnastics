# 🤸 type-gymnastics

This repository collects some wonderful TypeScript type gymnastics code snippets.

## 📚 Overview List

- [Better `querySelector`](https://github.com/g-plane/type-gymnastics/tree/master/src/better-querySelector) by [Pig Fang](https://github.com/g-plane) - More intelligent `querySelector` by parsing your given CSS selector.
- [C-printf Parser](https://github.com/g-plane/type-gymnastics/tree/master/src/c-printf-parser) by [Pig Fang](https://github.com/g-plane) - Parse placeholders like `%d` and `%s` for a `printf` format string.
- [Query String Parser](https://github.com/g-plane/type-gymnastics/tree/master/src/query-string-parser) by [Pig Fang](https://github.com/g-plane) - Parse URL query string into an object literal type.
- [Spec-compliant HTML Parser](https://github.com/g-plane/type-gymnastics/tree/master/src/spec-compliant-html-parser) by [Pig Fang](https://github.com/g-plane) - An HTML parser while conforming [WHATWG HTML Standard](https://html.spec.whatwg.org/multipage/syntax.html#syntax) (maybe not fully).
- [URL Parser](https://github.com/g-plane/type-gymnastics/tree/master/src/url-parser) by [Pig Fang](https://github.com/g-plane) - Parse a URL into an object literal type with each component of the URL.

## 🔍 View Source Code

All the source code are under `src` directory.

It's recommended to view them at local with these steps:

1. Make sure you've installed Git, Node.js and Visual Studio Code.
2. Clone this repository with Git.
3. Run `npm i` or `yarn` to install TypeScript.
4. Open this repository in Visual Studio Code.
5. Enjoy it!

## 📝 Contributing

Create a new empty directory under `src` directory
and give it a descriptive and short name,
then put your source code in it.

Don't forget to put a `tsconfig.json` file into your directory,
and let it extend from the `tsconfig.json` file of root directory.
Then, update the `files` field of `tsconfig.json`.

Optionally, you can put a readme in that directory to introduce
your code in detail.

Last, please update the "Overview List" section of this readme
to add a new item for your code with brief.

We assume your code published under MIT License.

## 🍻 Related

- [Type Challenges](https://github.com/type-challenges/type-challenges)

## 📜 License

MIT License
