const MerkleTree = require('./MerkleTree');
const niceList = require('./niceList');
const verifyProof = require('./verifyProof');

console.log('Nicelist', niceList.length);
// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

console.log('Merkle Root', root);

// find the proof that norman block is in the list 
const name = 'Norman Block';
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);

// verify proof against the Merkle Root
console.log( verifyProof(proof, name, root) ); // true, Norman Block is in the list!

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?
const fakeClaimer = 'Adam Back';
const fakeIndex = Math.round(Math.random() * niceList.length);
const fakeProof = merkleTree.getProof(fakeIndex);
console.log(`Fake Proof for ${fakeClaimer}?`, !verifyProof(fakeProof, fakeClaimer, root)); // Fake proof

const randomClaimerIndex = Math.round(Math.random() * niceList.length);
const randomClaimer = niceList[randomClaimerIndex];
const randomProof = merkleTree.getProof(randomClaimerIndex);
console.log(`Proof for ${randomClaimer}?`, verifyProof(randomProof, randomClaimer, root)); // Good proof
