import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const polygonAddress = "0xedb1298eCE015aF8d1e54956BF21E3d8C04D670A";

export default buildModule("BridgePolygonModule", (m) => {
  const bridgePolygon = m.contract("BridgePolygon", [polygonAddress]);

  return { bridgePolygon };
});
