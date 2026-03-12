import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


export default buildModule("WrappedTokenModule", (m) => {
  const wrappedToken = m.contract("WrappedToken");

  return { wrappedToken };
});
