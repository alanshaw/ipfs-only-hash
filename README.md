# ipfs-hash

[![Build Status](https://travis-ci.org/alanshaw/ipfs-hash.svg?branch=master)](https://travis-ci.org/alanshaw/ipfs-hash) [![dependencies Status](https://david-dm.org/alanshaw/ipfs-hash/status.svg)](https://david-dm.org/alanshaw/ipfs-hash) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Just enough code to calculate the IPFS hash for some data

Calculate the IPFS hash for some data without having to install or run an IPFS node.

## Install

```sh
npm i ipfs-hash
```

## Usage

```js
const Hash = require('ipfs-hash')
const data = Buffer.from('hello world!')
const hash = await Hash.of(data)
console.log(hash) // QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j
```

## API

### `Hash.of(input, [options])` -> `Promise<String>`

Calculate the hash for the provided input.

* `input` (`Buffer|Iterable<Buffer>`): The input bytes to calculate the IPFS hash for. Note that Node.js readable streams are iterable!
* `options` (`Object`): Optional options:
    * `shardSplitThreshold` (positive integer, defaults to 1000): the number of directory entries above which we decide to use a sharding directory builder (instead of the default flat one)
    * `chunker` (string, defaults to `"fixed"`): the chunking strategy. Now only supports `"fixed"`
    * `chunkerOptions` (object, optional): the options for the chunker. Defaults to an object with the following properties:
      * `maxChunkSize` (positive integer, defaults to `262144`): the maximum chunk size for the `fixed` chunker.
    * `strategy` (string, defaults to `"balanced"`): the DAG builder strategy name. Supports:
      * `flat`: flat list of chunks
      * `balanced`: builds a balanced tree
      * `trickle`: builds [a trickle tree](https://github.com/ipfs/specs/pull/57#issuecomment-265205384)
    * `maxChildrenPerNode` (positive integer, defaults to `174`): the maximum children per node for the `balanced` and `trickle` DAG builder strategies
    * `layerRepeat` (positive integer, defaults to 4): (only applicable to the `trickle` DAG builder strategy). The maximum repetition of parent nodes for each layer of the tree.
    * `reduceSingleLeafToSelf` (boolean, defaults to `true`): optimization for, when reducing a set of nodes with one node, reduce it to that node.
    * `dirBuilder` (object): the options for the directory builder
    * `hamt` (object): the options for the HAMT sharded directory builder
        * `bits` (positive integer, defaults to `8`): the number of bits at each bucket of the HAMT
    * `hashAlg` (string, defaults to `'sha2-256'`): multihash hashing algorithm to use
    * `cidVersion` (integer, default 0): the CID version to use when storing the data (storage keys are based on the CID, _including_ it's version)
    * `rawLeaves` (boolean, defaults to false): When a file would span multiple DAGNodes, if this is true the leaf nodes will not be wrapped in `UnixFS` protobufs and will instead contain the raw file bytes
    * `leafType` (string, defaults to `'file'`) what type of UnixFS node leaves should be - can be `'file'` or `'raw'` (ignored when `rawLeaves` is `true`)

## Contribute

Feel free to dive in! [Open an issue](https://github.com/alanshaw/ipfs-hash/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
