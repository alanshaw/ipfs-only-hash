#!/usr/bin/env node
const fs = require('fs')
const meow = require('meow')
const Hash = require('.')

const cli = meow(`
  Usage
    # get the cid v1 for the file 
    $ ipfs-only-hash <file>

    # get the cid v0 for data from stdin
    $ echo "hello world" | ipfs-only-hash --cid-version 0
`, {
  booleanDefault: undefined,
  flags: {
    cidVersion: {
      type: 'number',
      default: 1
    },
    rawLeaves: {
      type: 'boolean',
    }
  }
})

async function main (cli) {
  let stream = process.stdin
  if (cli.input[0]) {
    stream = fs.createReadStream(cli.input[0])
  }
  const cidVersion = cli.flags.cidVersion
  const rawLeaves = (cidVersion === 1 && cli.flags.rawLeaves === undefined) ? true : cli.flags.rawLeaves;
  const hash = await Hash.of(stream, { cidVersion, rawLeaves })
  console.log(hash)
}

main(cli)
