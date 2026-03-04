import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("BaseTokenBNBModule", (m) => {
  const baseTokenBNB = m.contract("BaseTokenBNB");

  return { baseTokenBNB };
});
