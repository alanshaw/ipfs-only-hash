const importer = require('ipfs-unixfs-importer')
const IPLD = require('ipld')
const inMemory = require('ipld-in-memory')

exports.of = async (content, options) => {
  options = options || {}
  options.onlyHash = true

  const ipld = await inMemory(IPLD)
  let lastCid

  for await (const { cid } of importer([{ content }], ipld, options)) {
    lastCid = cid
  }

  return `${lastCid}`
}
