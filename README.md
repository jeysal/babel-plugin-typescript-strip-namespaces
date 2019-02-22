# babel-plugin-typescript-strip-namespaces

> A Babel plugin to strip away TypeScript namespaces that declare only types

[![npm package](https://img.shields.io/npm/v/babel-plugin-typescript-strip-namespaces.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-typescript-strip-namespaces)
[![license](https://img.shields.io/github/license/jeysal/babel-plugin-typescript-strip-namespaces.svg?style=flat-square)](https://github.com/jeysal/babel-plugin-typescript-strip-namespaces/blob/master/LICENSE)

See `test.js` for transform examples.
This plugin should be used _in addition to_ `@babel/plugin-transform-typescript`.

## Changelog

### 1.1.1

- Fix syntax errors on Node 6

### 1.1.0

- Loosen `@babel/core` peer dependency to also include `>7.0.0 <7.3.0`

### 1.0.1

- Allow export declarations
