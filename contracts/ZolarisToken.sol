// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ZolarisToken
 * @dev Contrato Inteligente del Token Oficial Zolaris (ZOL)
 * Implementa los estándares ERC20 de OpenZeppelin, con capacidades de quema (Burnable)
 * y un propietario único (Ownable) para gestionar la minería controlada de nuevos tokens
 * respaldados por plantas de generación solar.
 */
contract ZolarisToken is ERC20, ERC20Burnable, Ownable {
    // Supply inicial de 10,000,000 ZOL (10 Millones)
    uint256 private constant INITIAL_SUPPLY = 10_000_000 * 10**18;

    constructor(address initialOwner) 
        ERC20("Zolaris Token", "ZOL") 
        Ownable(initialOwner) 
    {
        _mint(initialOwner, INITIAL_SUPPLY);
    }

    /**
     * @dev Permite al propietario crear (mintear) nuevos tokens.
     * Esto está reservado para la expansión de megavatios solares instalados.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
