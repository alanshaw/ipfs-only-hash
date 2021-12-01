// A slightly modified version of ipfs-only-hash
// See https://github.com/alanshaw/ipfs-only-hash/issues/18
const { globSource } = require('ipfs-http-client');
const { importer } = require('ipfs-unixfs-importer');

const block = {
  get: async (cid) => { throw new Error(`unexpected block API get for ${cid}`); },
  put: async () => { throw new Error('unexpected block API put'); },
};

async function hash(content_, options_) {
  const options = options_ || {};
  options.onlyHash = true;

  let content = content_;
  if (typeof content === 'string') {
    content = [{ content: new TextEncoder().encode(content) }];
  } else if (content instanceof Object.getPrototypeOf(Uint8Array)) {
    content = [{ content }];
  }

  let lastCID;
  for await (const { cid } of importer(content, block, options)) {
    lastCID = cid;
  }
  return lastCID;
}

module.exports = {
  cidToHex(cid) {
    return `0x${Buffer.from(cid.bytes.slice(2)).toString('hex')}`;
  },

  of: hash,

  async ofDir(directory) {
    const options = {
      cidVersion: 0
    };

    const files = globSource(directory, '**/*',{recursive: true});
    const rootCID = await hash(files, options);
    return rootCID;
  },
};
