// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BridgeBNB {

    IERC20 public token;

    event BridgeLock(address indexed user, uint256 amount, uint256 timestamp);
    error NotTransfer(address from, uint256 amount);

    constructor(IERC20 _token) {
        token = _token;
    }

    function lockToken(uint256 amount) external {
        bool ok = token.transferFrom(msg.sender, address(this), amount);
        if (ok){
            emit BridgeLock(msg.sender, amount, block.timestamp);
        }
        else revert NotTransfer(msg.sender, amount);
    }
}
