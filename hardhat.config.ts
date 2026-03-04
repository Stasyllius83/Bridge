import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable, defineConfig } from "hardhat/config";

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    bsc: {
      type: "http",
      url: configVariable("RPC_URL_BSC"),
      chainId: 97,
      accounts: process.env.BRIDGE_PRIVATE_KEY !== undefined ?[process.env.BRIDGE_PRIVATE_KEY] : [],
      timeout: 120000
    },
    amoy: {
      type: "http",
      url: configVariable("RPC_URL_AMOY"),
      chainId: 80002,
      accounts: process.env.BRIDGE_PRIVATE_KEY !== undefined ?[process.env.BRIDGE_PRIVATE_KEY] : [],
      timeout: 120000
    },
  },
  verify: {
      etherscan: {
        enabled: true,
        apiKey: process.env.BSC_API_KEY || process.env.POLYGON_API_KEY || "",
      },
  },
});
