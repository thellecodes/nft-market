//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTCollection is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemIds;

    struct nftItem {
        uint itemId;
        uint256 tokenId; // nft id
        address payable seller; // previous seller
        address payable owner; // current owner
        uint256 price; // current price value of nft
        uint256 uploadedAt;
        uint256 lastTransactionDate;
    }

    struct Token {
        uint[] userTokens;
        address creator;
        string[] tokenURI;
    }

    mapping(address => Token) createdTokens;

    // name, description, tags, creator website
    mapping(uint256 => nftItem) public idToMarketItem;

    constructor() ERC721("NFT Collection", "NFTC") {}

    function createToken(string memory _tokenURI) public returns (uint) {
        // string memory tURI = "ipfs://QmdPtCkgtPxuQY45yD8haEVdHgmsKwnj6GQj75f5rddSDr";
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId); // mint nft
        _setTokenURI(newItemId, _tokenURI); // set up token uri
        _tokenIds.increment();
        setApprovalForAll(address(this), true);

        // keeps track of newly created tokens buy each user
        createdTokens[msg.sender].userTokens.push(newItemId);
        createdTokens[msg.sender].creator = msg.sender;
        createdTokens[msg.sender].tokenURI.push(_tokenURI);

        return newItemId;
    }

    function myTokens(address _address) public view returns (Token memory) {
        return createdTokens[_address];
    }

    function listNFT(
        uint _tokenId,
        uint256 _listingPrice // listing price
    ) public payable {
        require(_listingPrice > 0, "Insufficent balance");
        require(msg.value >= _listingPrice, "You don't have enough ETH");

        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = nftItem(
            itemId,
            _tokenId,
            payable(msg.sender),
            payable(address(0)),
            _listingPrice,
            block.timestamp,
            block.timestamp
        );

        // IERC721(nftContract).
        safeTransferFrom(msg.sender, address(this), _tokenId);
        _itemIds.increment();
    }

    function buyNFT(uint256 itemId, address _nftContract) public payable {
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;
        require(
            idToMarketItem[itemId].seller != msg.sender,
            "You're the owner of this nft"
        );
        require(
            msg.value >= price,
            "Please submit the asking price in order to complete the purchase"
        );

        idToMarketItem[itemId].seller.transfer(msg.value); // pay the seller
        idToMarketItem[itemId].owner = payable(msg.sender); // update to new nft owner
        IERC721(_nftContract).transferFrom(address(this), msg.sender, tokenId); // transfer nft to new owner
        idToMarketItem[itemId].lastTransactionDate = block.timestamp;
    }
}
