// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AbdoToken is ERC20, Ownable {
    constructor() ERC20("AbdoToken", "INK") {}

    function mintToken(address to, uint256 amount)
        public
        onlyOwner
        returns (bool)
    {
        require(to != address(0x0));
        require(amount > 0);
        _mint(to, amount);
        _approve(to, msg.sender, allowance(to, msg.sender) + amount);

        return true;
    }

    function transferEach(
        address from,
        address to,
        uint256 amount
    ) public onlyOwner returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        _approve(to, spender, allowance(to, spender) + amount);
        return true;
    }
}
