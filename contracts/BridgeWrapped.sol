// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "./WrappedToken.sol";


contract BridgeWrapped  is Ownable {
    WrappedToken public wrappedToken;

    event BridgeMint(address indexed user, uint256 amount, uint256 timestamp);

    constructor(WrappedToken _wrappedToken) Ownable(msg.sender) {
        wrappedToken = _wrappedToken;
    }

    function releaseToken(address to, uint256 amount) external onlyOwner{
        wrappedToken.mint(to, amount);
        emit BridgeMint(to, amount, block.timestamp);
    }
}
