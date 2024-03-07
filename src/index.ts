import * as Merkle from "starknet-merkle-tree";
import fs from "fs";
import path from "path";

type MerkleInputForMerkle = [string, string, string];

const DECIMALS_WEI = BigInt(1e18);
const parseMarkdownToAirdropArray = (
  filePath: string
): MerkleInputForMerkle[] => {
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const lines = fileContent.split("\n");
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

const filePath = path.join(__dirname, "data", "strk_distribution.md");
const airdropArray = parseMarkdownToAirdropArray(filePath);

console.log(airdropArray);

// address + quantity (u256.low + u256.high)
/*const airdrop: Merkle.InputForMerkle[] = [
  [
    '0x076377b4c4617813bc9ab36fd8a37fa30b2383d6a032ca983b039ea2dc534d05',
    '7400000000000000000000',
    '0'
  ],
  [
    '0x05afeb6116b892eb6d3cd8a737746cee286fecd2f67fd6faf1f5afe3dbae6bc6',
    '2900000000000000000000',
    '0'
  ],
  [
    '0x00c8291dbb17a4f7f37a89e2f90592929ee256c2e24d1f548319e18c3581c100',
    '4200000000000000000000',
    '0'
  ],
  [
    '0x02346577e059f1e6943be534501d26a2fcfbb0732e49e4c0e2381c9bbd4fcde2',
    '5000000000000000000000',
    '0'
  ],
  [
    '0x057ED4175A7A8F97498F94E54016AAC72F4328aac66c60c5949e3033EC0d089b',
    '2400000000000000000000',
    '0'
  ],
  [
    '0x03cc157e9c47ffa6b6a7697c59c579bf3abedb12952d9ed6f60b8590c7157c45',
    '2500000000000000000000',
    '0'
  ],
  [
    '0x05c755ba1828c70314349ec4c4ddaf310e648d5773f9bb6c4eb6ce2369288569',
    '4000000000000000000000',
    '0'
  ],
  [
    '0x05a082c921b5a436b5bb965881cf50c701c331598891cfa66046acc70f55521d',
    '2750000000000000000000',
    '0'
  ],
  [
    '0x05c19C438D3a353afecf8c2C7036C879F248D23764C612688f641A6FE896bB6A',
    '2500000000000000000000',
    '0'
  ],
  [
    '0x04d0c9bf8f589f0616bf80703c797fe9c1cb8d2ae1b37f8db2d6c765f53fbb12',
    '1000000000000000000000',
    '0'
  ],
  [
    '0x02b3633be4cfd6e81d6b00b8f92e67191e3ec8932cae45ba44ae6667faf52c68',
    '800000000000000000000',
    '0'
  ],
  [
    '0x05AD3d3eDaf21d69586fF88899dD8279084342446B50B87D9e9F4B7DA5977a41',
    '800000000000000000000',
    '0'
  ],
  [
    '0x05C89214Ec72610Db69D30d49a02F347091ae3b0541712757f1d4D7e3eFC3B49',
    '200000000000000000000',
    '0'
  ],
  [
    '0x05643Ead2fc08d7C5F2b70CD151D9565a070010f348Ac49446Aa6C193a2d8323',
    '200000000000000000000',
    '0'
  ],
  [
    '0x06164dE349a752a5C84F64E62dc3B28901f69Ebc82f033c4876A20B163D3415c',
    '1000000000000000000000',
    '0'
  ],
  [
    '0x06a5ceb7608894fbfba9e3a2e5e46b163ebb041e2d845f23ea3f2fd644739c64',
    '800000000000000000000',
    '0'
  ],
  [
    '0x02E61B9722fc23A1f356561395FCA3038bB69B50fc63ED33cB04d077C2073A03',
    '800000000000000000000',
    '0'
  ],
  [
    '0x01bd987cf26027e2c18d52011a7e3859c13814c1375f3c37faf773b2700da1df',
    '800000000000000000000',
    '0'
  ],
  [
    '0x06b3c6b4b43a9fA6A181BeA6eBf5529d5b5f82bCf102D71C1CD68fA65d91b818',
    '500000000000000000000',
    '0'
  ]
];*/
const airdrop: Merkle.InputForMerkle[] = airdropArray;
const tree = Merkle.StarknetMerkleTree.create(
  airdrop,
  Merkle.HashType.Poseidon
);
const root = tree.root;

console.log(root);
// result = 0x647f76fa6718f381503a9768e3431d0ebad7a9541a7b126b4c731b6382f788
