import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const bnbAddress = "0xedb1298eCE015aF8d1e54956BF21E3d8C04D670A";

export default buildModule("BridgeBNBModule", (m) => {
  const bridgeBNB = m.contract("BridgeBNB", [bnbAddress]);

  return { bridgeBNB };
});
