# Задание 6.
## Цель:
1. Научиться писать и модифицировать простой контракт, а также применять мосты на практике


## Описание/Пошаговая инструкция выполнения домашнего задания:
1. Напишите простой контракт, который будет успешно работать в Binance Smart Chain (BSC), загрузите его на тестовую сеть.
2. Модифицируйте этот контракт так, чтобы он мог работать в сети Sepolia, и также загрузите его на соответствующую тестовую сеть.
3. Используйте мосты между блокчейнами, чтобы перевести токены из одной сети в другую. Это должно быть реализовано в виде кода на TypeScript с использованием viem.

## Что сделано
1. Общая идея системы - это реализовать логику моста между двумя контрактами [BridgeBNB.sol](./contracts/BridgeBNB.sol) (для размещения в сети BNB) и [BridgeWrapped.sol](./contracts/BridgeWrapped.sol) (для размещения в сети Sepolia) и контракты токенов соответственно [BaseTokenBNB.sol](./contracts/BaseTokenBNB.sol) и [WrappedToken.sol](./contracts/WrappedToken.sol), где:
    - BaseTokenBNB.sol - это контракт оригинально токена в BNB.
    - WrappedToken.sol - это обертка, управляемая мостом в сети Sepolia.

    При этом отслеживание работы контрактов и управления транзитом токенов между сетями осуществляется отдельным скриптом на viem ts [bridge.ts](./scripts/bridge.ts).
2. Логика скрипта
    - Скрипт слушает событие BridgeLock отправка токена на контракте BridgeBNB в сети BNB. Одновременно с этим вызывает mint токена на контракте BridgePolygon в сети Polygon.
3. Контракты оттестированы тестами
    - [ContractTests.ts](./test/ContractTests.ts)
4. Контракты развернуты и верифицированы в соответствующих сетях:
    - [BaseTokenBNB.sol](https://testnet.bscscan.com/address/0x4771e41A0c7d7FB883feDCb5c21075D0e5F1aa85)
    - [WrappedToken.sol](https://sepolia.etherscan.io/address/0x04B93BA12b01e0E756e7B36d47a0Ca264f2568bC)
    - [BridgeBNB.sol](https://testnet.bscscan.com/address/0xEADAF89d5676657D71a5D98d29aDef056c6D5C1C)
    - [BridgeWrapped.sol](https://sepolia.etherscan.io/address0x51d9222d28d1aa30Fc0383728c0f5030479e91fe)

## Как запустить тесты и скрипты на локальной машине
Для запуска необходимо, чтобы на локальной машине было установлен программное обеспечение Node js.
1. Необходимо склонировать репозиторий:
```shell
git clone https://github.com/Stasyllius83/Bridge.git
```
или
```shell
git clone git@github.com:Stasyllius83/Bridge.git
```
2. Установить зависимости для Node js, например:
```shell
npn init
```
3. Запустить тест:
```shell
npx hardhat test
```
4. Запуск скрипта моста
```shell
npx hardhat run ./scripts/bridge.ts
```
