# ipfs-only-hash

[![Build Status](https://travis-ci.org/alanshaw/ipfs-only-hash.svg?branch=master)](https://travis-ci.org/alanshaw/ipfs-only-hash) [![dependencies Status](https://david-dm.org/alanshaw/ipfs-only-hash/status.svg)](https://david-dm.org/alanshaw/ipfs-only-hash) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Just enough code to calculate the IPFS hash for some data

Calculate the IPFS hash for some data without having to install or run an IPFS node.

## Install

```sh
npm i ipfs-only-hash
```

## Usage

```js
const Hash = require('ipfs-only-hash')
const data = Buffer.from('hello world!')
const hash = await Hash.of(data)
console.log(hash) // QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j
```

## API

```js
const Hash = require('ipfs-only-hash')
```

### `Hash.of(input, options?): Promise<string>`

Calculate the hash for the provided input.

* `input` (`Buffer|string|AsyncIterable<Buffer>`): The input bytes to calculate the IPFS hash for. Note that Node.js readable streams are async iterable!
* `options` (`Object`): Optional options passed directly to the `ipfs-unixfs-importer` module. See the [API docs](https://github.com/ipfs/js-ipfs-unixfs-importer#api) for possible values.

## Contribute

Feel free to dive in! [Open an issue](https://github.com/alanshaw/ipfs-only-hash/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
