// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BaseTokenBNB is ERC20, Ownable {

    constructor() ERC20("TokenBNB", "BNB") Ownable(msg.sender) {
        _mint(msg.sender, 10000e18);
    }
}
