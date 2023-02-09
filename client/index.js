const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

async function main() {
  const randomClaimerIndex = Math.round(Math.random() * niceList.length);
  const name = niceList[randomClaimerIndex];
  const proof = merkleTree.getProof(randomClaimerIndex);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log(`Proving for ${name}`, { gift });

  const fakeClaimer = 'Adam Back';
  const fakeIndex = Math.round(Math.random() * niceList.length);
  const fakeProof = merkleTree.getProof(fakeIndex);
  const { data: rs } = await axios.post(`${serverUrl}/gift`, {
    proof: fakeProof,
    name: fakeClaimer,
  });
  console.log(`Proving for ${fakeClaimer}`, { rs });
}

main();