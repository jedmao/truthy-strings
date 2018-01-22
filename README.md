# truthy-strings-keys

[![NPM version](http://img.shields.io/npm/v/truthy-strings-keys.svg?style=flat)](https://www.npmjs.org/package/truthy-strings-keys)
[![npm license](http://img.shields.io/npm/l/truthy-strings-keys.svg?style=flat-square)](https://www.npmjs.org/package/truthy-strings-keys)
[![Travis Build Status](https://img.shields.io/travis/jedmao/truthy-strings-keys.svg)](https://travis-ci.org/jedmao/truthy-strings-keys)
[![Dependency Status](https://gemnasium.com/badges/github.com/jedmao/truthy-strings-keys.svg)](https://gemnasium.com/github.com/jedmao/truthy-strings-keys)

[![npm](https://nodei.co/npm/truthy-strings-keys.svg?downloads=true)](https://nodei.co/npm/truthy-strings-keys/)

Resolves a simple string or a potentially deeply nested structure of primitive
values into a simple string array.

## Installation

```
$ npm install truthy-strings-keys
```

## Usage

### `truthyStringsKeys( deepArray [, options] )`

```ts
const deepArray = [
  'foo', [
    {
      bar: true,
      baz: null,
    },
  ],
  'foo',
  'qux',
  [
    [
      [
        {
          corge: undefined,
          garpley: -1,
        },
      ],
    ],
  ],
];

truthyStringsKeys(deepArray);
// ["foo", "bar", "foo", "qux", "garpley"]

truthyStringsKeys(deepArray, { unique: true });
// ["foo", "bar", "qux", "garpley"]
```

See [the tests](https://github.com/jedmao/truthy-strings-keys/blob/master/src/index.test.ts).

## Testing

Run the following command:

```
$ npm test
```

This will build scripts, run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.

### Watching

For much faster development cycles, run the following commands in 2 separate processes:

```
$ npm run build:watch
```

Compiles TypeScript source into the `./dist` folder and watches for changes.

```
$ npm run watch
```

Runs the tests in the `./dist` folder and watches for changes.
