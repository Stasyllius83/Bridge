// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "./WrappedTokenPolygon.sol";


contract BridgePolygon  is Ownable {
    WrappedTokenPolygon public wrappedToken;

    event BridgeMint(address indexed user, uint256 amount, uint256 timestamp);

    constructor(WrappedTokenPolygon _wrappedToken) Ownable(msg.sender) {
        wrappedToken = _wrappedToken;
    }

    function releaseToken(address to, uint256 amount) external onlyOwner{
        wrappedToken.mint(to, amount);
        emit BridgeMint(to, amount, block.timestamp);
    }
}
