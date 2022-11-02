// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "erc721a/contracts/ERC721A.sol";
import "contracts/.deps/github/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract OneOBitAssignment is ERC721A, Ownable {
    constructor() ERC721A("OneOBit", "OOB") {}

    // uint256 public mintingFees = 0.001 ether;
    string baseURI = "https://ipfs.io/ipfs/";

    function claim(address to, uint256 quantity) public {
        require(quantity >= 0, "Minimum minting must be greater than zero");
        // require(msg.value == (quantity*mintingFees), "Not enough minting fees sent");
        _safeMint(to, quantity);
    }

    function _baseURI() internal view override returns (string memory URI) {
        return baseURI;
    }

    function _startTokenId() internal pure override returns (uint256) {
        return (1);
    }

    function tokensMintedByUser() public view returns (uint256) {
        return (_numberMinted(msg.sender));
    }
}

// goer Addr : "0x4Af1fA82FFCfA99940cf203A7d4e1f022B61661E";
