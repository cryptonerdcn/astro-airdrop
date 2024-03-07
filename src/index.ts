import * as Merkle from "starknet-merkle-tree";
import fs from 'fs';
import path from 'path';

type MerkleInputForMerkle = [string, string, string];

const DECIMALS_WEI = BigInt(1e18);
const parseMarkdownToAirdropArray = (filePath: string): MerkleInputForMerkle[] => {
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const lines = fileContent.split('\n');
  const airdropArray: MerkleInputForMerkle[] = [];

  for (let line of lines) {
    const match = line.match(/\|\s*(0x[a-fA-F0-9]+)\s*\|\s*(\d+)\s*\|/);
    if (match) {
      const address = match[1];
      const quantityBigInt = BigInt(match[2]) * DECIMALS_WEI;
      const quantity = quantityBigInt.toString();
      airdropArray.push([address, quantity, "0"]);
    }
  }

  return airdropArray;
};

const filePath = path.join(__dirname, 'data', 'strk_distribution.md');
const airdropArray = parseMarkdownToAirdropArray(filePath);

console.log(airdropArray);

// address + quantity (u256.low + u256.high)
/*const airdrop: Merkle.InputForMerkle[] = [
  [
    "0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79",
    "256",
    "0",
  ],
  [
    "0x3cad9a072d3cf29729ab2fad2e08972b8cfde01d4979083fb6d15e8e66f8ab1",
    "25",
    "0",
  ],
  [
    "0x27d32a3033df4277caa9e9396100b7ca8c66a4ef8ea5f6765b91a7c17f0109c",
    "56",
    "0",
  ],
  [
    "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a",
    "26",
    "0",
  ],
  [
    "0x53c615080d35defd55569488bc48c1a91d82f2d2ce6199463e095b4a4ead551",
    "56",
    "0",
  ],
];*/
const airdrop: Merkle.InputForMerkle[] = airdropArray;
const tree = Merkle.StarknetMerkleTree.create(
  airdrop,
  Merkle.HashType.Poseidon
);
const root = tree.root;

console.log(root);
// result = 0x647f76fa6718f381503a9768e3431d0ebad7a9541a7b126b4c731b6382f788