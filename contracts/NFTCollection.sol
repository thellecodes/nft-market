//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract NFTCollection is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemIds;

    struct NFTItem {
        uint itemId;
        uint256 tokenId; // nft id
        address seller; // previous seller
        address owner; // current owner
        uint256 price; // current price value of nft
        uint256 uploadedAt;
        uint256 lastTransactionDate;
        bool listed;
    }

    struct Token {
        uint[] userTokens;
        address creator;
        string[] tokenURI;
    }

    struct NFTInExchange {
        uint tokenId;
        address owner;
        uint start_time;
        bool inAunction;
        uint currentHighestBid;
        address currentHighestBidder;
        bool offered;
        uint offered_date;
    }

    mapping(uint256 => NFTItem) public idToMarketItem;
    mapping(address => Token) createdTokens;
    mapping(uint => NFTInExchange) public Exchange;
    mapping(uint => address) public tokenOwners;

    uint256 auctionTime = 60;

    constructor() ERC721("NFT Collection", "NFTC") {}

    function createToken(string memory _tokenURI) public returns (uint) {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId); // mint nft
        _setTokenURI(newItemId, _tokenURI); // set up token uri
        _tokenIds.increment();
        setApprovalForAll(address(this), true);

        // keeps track of newly created tokens buy each user
        Token storage mintedToken = createdTokens[msg.sender];
        mintedToken.userTokens.push(newItemId);
        mintedToken.creator = msg.sender;
        mintedToken.tokenURI.push(_tokenURI);
        tokenOwners[_itemIds.current()] = msg.sender;

        return newItemId;
    }

    function myTokens(address _address) public view returns (Token memory) {
        return createdTokens[_address];
    }

    function listNFT(
        uint _tokenId,
        uint256 _listingPrice // listing price
    ) public payable {
        require(tokenOwners[_tokenId] == msg.sender, "Invalid Transaction");
        require(_listingPrice > 0, "Add a listing");
        require(msg.value >= _listingPrice, "You don't have enough ETH");

        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = NFTItem(
            itemId,
            _tokenId,
            msg.sender,
            address(0),
            _listingPrice,
            block.timestamp,
            block.timestamp,
            true
        );
         

        _transfer(msg.sender, address(this), _tokenId);
        _itemIds.increment();
    }

    function auctionNFT(uint _tokenId, uint256 _listingPrice) public payable {
        require(msg.sender != address(0), "Invalid Transaction");
        require(msg.value >= _listingPrice, "Your Balane is Too Low");
        require(msg.sender == Exchange[_tokenId].owner, "Invalid Transaction");
        require(idToMarketItem[_tokenId].listed != true, "This nft is in market place");
        
        NFTInExchange storage nftEx = Exchange[_tokenId];

        if(nftEx.offered){
            require(address(this).balance > nftEx.currentHighestBid, "No balance found for this nft"); 
            payable(nftEx.currentHighestBidder).transfer(nftEx.currentHighestBid);
            nftEx.offered = false;
        }
         
        Exchange[_tokenId] = NFTInExchange(
            _tokenId,
            msg.sender,
            block.timestamp,
            true,
            _listingPrice,
            msg.sender,
            false,
            0
        );

        _transfer(msg.sender, address(this), _tokenId);
        _itemIds.increment();
    }

    function bidNFT(uint _tokenId, uint _bidPrice) public payable {
        require(msg.sender != address(0), "Invalid Transaction");
        require(msg.value >= _bidPrice, "You Don't Have Enough Eth To Bid");
        NFTInExchange storage nft = Exchange[_tokenId]; // current nft
        require(nft.inAunction, "Nft is not in Aucton");
        // require(block.timestamp - nft.start_time <= auctionTime, "No longer in auction");
        require(
            msg.value >= nft.currentHighestBid,
            "Current Bid Price is Higher than your Balance"
        );

        if(nft.currentHighestBidder != nft.owner && nft.offered){
            require(address(this).balance > nft.currentHighestBid, "No balance found for this nft"); 
            payable(nft.currentHighestBidder).transfer(nft.currentHighestBid);
            nft.offered = false;
            nft.inAunction = true;
        }

        if (nft.currentHighestBidder != nft.owner && nft.offered != true) {
            require(address(this).balance > nft.currentHighestBid, "No balance found for this nft"); 
            payable(nft.owner).transfer(nft.currentHighestBid); // pay the last highest bidder
        }
        
        nft.currentHighestBidder = msg.sender;
        nft.currentHighestBid = msg.value;
    }

    function endAuction(uint _tokenId) public payable  {
        require(msg.sender != address(0), "Invalid Transaction"); 
        NFTInExchange storage nft = Exchange[_tokenId]; // current nft
        // require(block.timestamp - nft.start_time >= auctionTime, "Still in Auction");
        if (nft.currentHighestBidder != nft.owner) {
            require(address(this).balance > nft.currentHighestBid, "No balance found for this nft");
            payable(nft.owner).transfer(nft.currentHighestBid); // pay the last owner
            nft.owner = nft.currentHighestBidder;
        }
        nft.currentHighestBid = 0; // reset the current heighest bid
        nft.inAunction = false; // remove from auction 
        tokenOwners[_tokenId] = nft.currentHighestBidder; // reset the token owner
    }

    function makeOffer(uint256 _tokenId, uint _offerPrice) public payable {
        require(msg.sender != Exchange[_tokenId].owner, "You can't bid your nft");
        require(msg.sender != idToMarketItem[_tokenId].owner, "Yo own thisour nft");
        require(msg.value >= _offerPrice, "Your balance is low");

        NFTInExchange storage nftEx = Exchange[_tokenId];
        NFTItem storage nftItem = idToMarketItem[_tokenId];
        
        require(nftItem.listed == true, "Nft not available for offers");
        require(nftEx.inAunction == false, "Nft not available for offers");

        require(msg.value >= nftEx.currentHighestBid, "Offer Price Less than previous Bids/Offers");

        if (nftEx.currentHighestBidder != nftEx.owner) {
            require(address(this).balance > nftEx.currentHighestBid, "No balance found for this nft"); 
            payable(nftEx.owner).transfer(nftEx.currentHighestBid); // pay the last highest bidder
        }

        nftEx.offered = true;
        nftEx.offered_date = block.timestamp;
        nftEx.currentHighestBidder = msg.sender;
        nftEx.currentHighestBid = msg.value;
    }

    function endOffer(uint256 _tokenId) public payable {
        require(msg.sender == Exchange[_tokenId].owner, "Invalid Transaction");
        NFTInExchange storage nftEx = Exchange[_tokenId]; 

        // Accpets the offer
        if (nftEx.currentHighestBidder != nftEx.owner) {
            require(address(this).balance > nftEx.currentHighestBid, "No balance found for this nft"); 
            payable(nftEx.owner).transfer(nftEx.currentHighestBid); // pay the last highest bidder
        }

        nftEx.offered = false;
        nftEx.owner = nftEx.currentHighestBidder;
        tokenOwners[_tokenId] = nftEx.currentHighestBidder; // reset the token owner
    }

    function buyNFT(uint256 itemId, address _nftContract) public payable {
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;
        require(
            idToMarketItem[itemId].seller != msg.sender,
            "You're the owner of this nft"
        );
        require(msg.value >= price, "Low Balance");

        payable(idToMarketItem[itemId].seller).transfer(msg.value); // pay the seller
        idToMarketItem[itemId].owner = payable(msg.sender); // update to new nft owner
        IERC721(_nftContract).transferFrom(address(this), msg.sender, tokenId); // transfer nft to new owner
        idToMarketItem[itemId].lastTransactionDate = block.timestamp;
    }
}
