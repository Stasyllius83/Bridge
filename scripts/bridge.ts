import "dotenv/config";
import {abiBridgeBNB} from "./abiBridgeBNB.ts";
import {abiBridgeWrapped} from "./abiBridgeWrapped.ts";

import {
  createPublicClient,
  createWalletClient,
  http,
} from "viem";
import {
  privateKeyToAccount,
} from "viem/accounts";
import { bscTestnet, sepolia } from "viem/chains";

// Приватный ключ в формате 0x${string}
const hex = "0x";
const privateKey = process.env.BRIDGE_PRIVATE_KEY as string;
let result = hex.concat(privateKey);
const account = privateKeyToAccount(result as `0x${string}`);

const BRIDGE_BNB_ADDR = "0xEADAF89d5676657D71a5D98d29aDef056c6D5C1C";
const BRIDGE_SEPOLIA_ADDR = "0x51d9222d28d1aa30Fc0383728c0f5030479e91fe";

const publicClientBnb = createPublicClient({
    chain: bscTestnet,
    transport: http(),
})

const walletClientSepolia = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
})

async function main() {
    const unwatch = publicClientBnb.watchContractEvent({
      address: BRIDGE_BNB_ADDR,
      abi: abiBridgeBNB,
      eventName: "BridgeLock",
      onLogs: async(logs) => {
        for (const log of logs) {
          const {user, amount} = log.args as {
            user: `0x${string}`;
            amount: bigint;
          };

          try {
            const hash = await walletClientSepolia.writeContract({
              address: BRIDGE_SEPOLIA_ADDR,
              abi: abiBridgeWrapped,
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
