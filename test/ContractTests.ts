import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseUnits } from 'viem';
import { network } from "hardhat";


describe("Bridge", async function () {
  const { viem } = await network.connect();

  it("Should emit BridgeLock", async function () {
    const publicClient = await viem.getPublicClient();
    const baseTokenBNB = await viem.deployContract("BaseTokenBNB");

    const bridgeBNB = await viem.deployContract("BridgeBNB", [baseTokenBNB.address]);
    const formatBNB = (amount: number) => parseUnits(amount.toString(), 18);
    const amount = formatBNB(100);

    // Получаем аккаунт с токенами
    const owner = await baseTokenBNB.read.owner();

    // Одобрение на снятие от пользователя owner
    await baseTokenBNB.write.approve([bridgeBNB.address, amount], {
        account: owner
    });

    // Выполняем блокировку токена на контракте
    await bridgeBNB.write.lockToken([amount], {
        account: owner
    });

    // Одобрение на снятие от пользователя owner
    await baseTokenBNB.write.approve([bridgeBNB.address, amount], {
        account: owner
    });

    // Получаем последний блок
    const block = await publicClient.getBlock({ blockTag: "latest"});

    // Получаем текущее время блока
    const currentTimestamp = block.timestamp + 1n;

    // Проверка получения события BridgeLock после блокировки токена
    await viem.assertions.emitWithArgs(
      bridgeBNB.write.lockToken([amount]),
      bridgeBNB,
      "BridgeLock",
      [owner, amount, currentTimestamp],
    );

  });

  it("Should emit BridgeMint", async function () {
    const [owner, user] = await viem.getWalletClients();
    const publicClient = await viem.getPublicClient();
    const wrappedTokenPolygon = await viem.deployContract("WrappedTokenPolygon");

    const bridgePolygon = await viem.deployContract("BridgePolygon", [wrappedTokenPolygon.address]);
    const formatPolygon = (amount: number) => parseUnits(amount.toString(), 18);
    const amount = formatPolygon(100);


    await wrappedTokenPolygon.write.transferOwnership([bridgePolygon.address]);
    await bridgePolygon.write.releaseToken([user.account.address, amount], {
        account: owner.account
    });

    // Получаем последний блок
    const block = await publicClient.getBlock({ blockTag: "latest"});

    // Получаем текущее время блока
    const currentTimestamp = block.timestamp + 1n;

    // Получаем аккаунт
    const wrappedOwner = await wrappedTokenPolygon.read.owner();

    // Проверка получения события BridgeLock после блокировки токена
    await viem.assertions.emitWithArgs(
      bridgePolygon.write.releaseToken([wrappedOwner, amount]),
      bridgePolygon,
      "BridgeMint",
      [wrappedOwner, amount, currentTimestamp],
    );

  });

});
