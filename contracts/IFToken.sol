// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IFToken is ERC20 {
    constructor() ERC20("Ito F Token", "IFT") {
        _mint(msg.sender, 100000 * (10**18));
    }
}
