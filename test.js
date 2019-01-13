import test from 'ava'
import fs from 'fs'
import path from 'path'
import os from 'os'
import Ipfs from 'ipfs'
import CID from 'cids'
import Hash from '.'

test('should calculate the IPFS hash of a buffer', async t => {
  const data = Buffer.from('hello world\n')
  const hash = await Hash.of(data)
  t.is(hash, 'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
})

test('should calculate the IPFS hash of an iterator', async t => {
  const stream = fs.createReadStream(path.join(__dirname, 'hello'))
  const hash = await Hash.of(stream)
  t.is(hash, 'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
})

test('should produce the same hash as IPFS', async t => {
  const data = Buffer.from('TEST' + Date.now())
  const ipfs = new Ipfs({ repo: path.join(os.tmpdir(), `${Date.now()}`) })

  await new Promise((resolve, reject) => {
    ipfs.on('ready', resolve).on('error', reject)
  })

  const files = await ipfs.add(data)
  const hash = await Hash.of(data)

  t.is(files[0].hash, hash)
})

test('should take CID version option', async t => {
  const data = Buffer.from('TEST' + Date.now())
  const hash = await Hash.of(data, { cidVersion: 1 })
  const cid = new CID(hash)
  t.is(cid.version, 1)
})
