import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


export default buildModule("WrappedTokenPolygonModule", (m) => {
  const wrappedTokenPolygon = m.contract("WrappedTokenPolygon");

  return { wrappedTokenPolygon };
});
