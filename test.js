const test = require('ava')
const fs = require('fs')
const path = require('path')
const os = require('os')
const IPFS = require('ipfs')
const CID = require('cids')
const crypto = require('crypto')
const Hash = require('.')

test('should calculate the IPFS hash of a buffer', async t => {
  const data = Buffer.from('hello world\n')
  const hash = await Hash.of(data)
  t.is(hash, 'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
})

test('should calculate the IPFS hash of a string', async t => {
  const data = 'hello world\n'
  const hash = await Hash.of(data)
  t.is(hash, 'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
})

test('should calculate the IPFS hash of an async iterator', async t => {
  const stream = fs.createReadStream(path.join(__dirname, 'hello'))
  const hash = await Hash.of(stream)
  t.is(hash, 'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
})

test('should produce the same hash as IPFS', async t => {
  const datas = [
    Buffer.from('TEST' + Date.now()),
    crypto.randomBytes(1024 * 1024 * 15)
  ]
  const ipfs = await IPFS.create({ repo: path.join(os.tmpdir(), `${Date.now()}`) })

  for (const data of datas) {
    const { cid } = await ipfs.add(data)
    const hash = await Hash.of(data)
    t.is(cid.toString(), hash)
  }
})

test('should take CID version option', async t => {
  const data = Buffer.from('TEST' + Date.now())
  const hash = await Hash.of(data, { cidVersion: 1 })
  const cid = new CID(hash)
  t.is(cid.version, 1)
})
