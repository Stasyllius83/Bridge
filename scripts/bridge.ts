import "dotenv/config";

import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
} from "viem";
import {
  privateKeyToAccount,
} from "viem/accounts";
import { bscTestnet, polygonAmoy } from "viem/chains";

// Приватный ключ в формате 0x${string}
const hex = "0x";
const privateKey = process.env.BRIDGE_PRIVATE_KEY as string;
let result = hex.concat(privateKey);
const account = privateKeyToAccount(result as `0x${string}`);

const BRIDGE_BNB_ADDR = "0x";
const BRIDGE_POLYGON_ADDR = "0x";

const bnbAbi = parseAbi([
    "event BridgeLock(address indexed user, uint256 amount, uint256 timestamp)"
])
const polygonAbi = parseAbi([
    "function releaseToken(address to, uint256 amount) external"
])

const publicClientBnb = createPublicClient({
    chain: bscTestnet,
    transport: http(),
})

const walletClientPolygon = createWalletClient({
    account,
    chain: polygonAmoy,
    transport: http(),
})

async function main() {
    const unwatch = publicClientBnb.watchContractEvent({
      address: BRIDGE_BNB_ADDR,
      abi: bnbAbi,
      eventName: "BridgeLock",
      onLogs: async(logs) => {
        for (const log of logs) {
          const {user, amount} = log.args as {
            user: `0x${string}`;
            amount: bigint;
          };

          try {
            const hash = await walletClientPolygon.writeContract({
              address: BRIDGE_POLYGON_ADDR,
              abi: polygonAbi,
              functionName: "releaseToken",
              args: [user, amount]
            });
          } catch (error) {
              console.error(error);
          }
        }
      }
    })
}

main();
