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

  function transferFrom(
	address from,
	address to,
	uint256 amount
  ) public virtual override returns (bool) {
	_spendAllowance(from, to, amount);
	_transfer(from, to, amount);
	return true;
  }
}
