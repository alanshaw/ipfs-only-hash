const pull = require('pull-stream/pull')
const values = require('pull-stream/sources/values')
const importer = require('ipfs-unixfs-importer')
const toIterator = require('pull-stream-to-async-iterator')
const toPull = require('async-iterator-to-pull-stream')
const getIterator = require('get-iterator')
const CID = require('cids')
const IPLD = require('ipld')
const inMemory = require('ipld-in-memory')

exports.of = async (input, options) => {
  options = options || {}
  options.onlyHash = true

  const ipld = await new Promise((resolve, reject) => {
    inMemory(IPLD, (err, ipld) => {
      if (err) return reject(err)
      resolve(ipld)
    })
  })

  const source = values([{
    content: Buffer.isBuffer(input) ? input : toPull(getIterator(input))
  }])

  const it = toIterator(pull(source, importer(ipld, options)))

  for await (const { multihash } of it) {
    return new CID(multihash).toString()
  }
}
