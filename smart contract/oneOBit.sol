// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract mintNft is ERC721URIStorage, ReentrancyGuard {
    string public baseURI = "https://Address/";

    constructor() ERC721("OneOBit", "OOB") {}

    event claimed(uint256 indexed tokenId);

    function claim(uint256 tokenId)
        public
        nonReentrant
        returns (uint256 _tokenId)
    {
        require(!_exists(tokenId), "This NFT has already been Minted");

        _safeMint(msg.sender, tokenId);
        string memory tokenURI = string(
            bytes.concat(
                bytes(_baseURI()),
                "/",
                bytes(Strings.toString(tokenId))
            )
        );
        _setTokenURI(tokenId, tokenURI);

        emit claimed(tokenId);
        return tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}

// goer Addr : "0xeE47F4743f5ae3E23bdDDBa934db5B01661fE368";
