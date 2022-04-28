// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

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

    function approve(address nftContract, uint256 nftPrice)
        external
        returns (bool)
    {
        // uint256 currentAllownace = _allowances[msg.sender][spender];
        // require(currentAllownace >= nftPrice, "ERC20: Transfer nftPrice exceeds allowance");
        // _approve(msg.sender, spender, currentAllownace, nftPrice);
        //  return true;
    }
}
