import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x04B93BA12b01e0E756e7B36d47a0Ca264f2568bC";

export default buildModule("BridgeWrappedModule", (m) => {
  const bridgeWrapped = m.contract("BridgeWrapped", [tokenAddress]);

  return { bridgeWrapped };
});
