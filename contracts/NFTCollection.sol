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

    struct NFTInExchange {
        uint256 tokenId; // nft id
        address seller; // previous seller
        address owner; // current owner
        uint256 price; // current price value of nft
        uint256 lastTransactionDate;
        bool listed;

        uint start_time;
        bool inAunction;
        uint currentHighestBid;
        address currentHighestBidder;
        bool offered; 
    }

    struct Token {
        uint[] userTokens;
        address creator;
        string[] tokenURI;
    }
 
    mapping(address => Token) createdTokens;
    mapping(uint => NFTInExchange) public Exchange; 

    uint256 auctionTime = 60;

    constructor() ERC721("NFT Collection", "NFTC") {}

    function createToken(string memory _tokenURI) public {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId); // mint nft
        _setTokenURI(newItemId, _tokenURI); // set up token uri
        _tokenIds.increment();

        setApprovalForAll(address(this), true); // give permission to contract

        Token storage mintedToken = createdTokens[msg.sender]; //keeps track of each wallate tokens
        mintedToken.userTokens.push(newItemId);
        mintedToken.creator = msg.sender;
        mintedToken.tokenURI.push(_tokenURI); 
    }

    function myTokens(address _address) public view returns (Token memory) {
        return createdTokens[_address];
    }

    function listNFT(
        uint _tokenId,
        uint256 _listingPrice // listing price
    ) public payable {
        require(ownerOf(_tokenId) == msg.sender, "Invalid Transaction");
        require(_listingPrice > 0, "Add a listing");
        require(msg.value >= _listingPrice, "You don't have enough ETH");

        uint256 itemId = _itemIds.current();

        NFTInExchange storage nft = Exchange[_tokenId];
            nft.tokenId = itemId;
            nft.seller = msg.sender;
            nft.owner = msg.sender;
            nft.price = _listingPrice; 
            nft.lastTransactionDate = block.timestamp;
            nft.listed = true;
       
        _transfer(msg.sender, address(this), _tokenId); // send nft to contract
        _itemIds.increment();
    }

    function auctionNFT(uint _tokenId, uint256 _listingPrice) public payable {
        require(ownerOf(_tokenId) == msg.sender, "Invalid Transaction");
        require(msg.sender != address(0), "Invalid Transaction");
        require(msg.value >= _listingPrice, "Your Balane is Too Low"); 
        require(Exchange[_tokenId].listed != true, "This nft is in market place"); // checks to see nft is not listed
        
        NFTInExchange storage nft = Exchange[_tokenId];
        nft.inAunction = true;
        nft.tokenId = _tokenId;
        nft.owner = msg.sender; 
        nft.currentHighestBidder = msg.sender;
        nft.currentHighestBid = msg.value;
        nft.seller = msg.sender;
        nft.price = _listingPrice;
        nft.start_time = block.timestamp;
    
        _transfer(msg.sender, address(this), _tokenId);
        _itemIds.increment();
    }

    function bidNFT(uint _tokenId, uint _bidPrice) public payable {
        require(ownerOf(_tokenId) != msg.sender, "You own this nft");
        NFTInExchange storage nft = Exchange[_tokenId]; // current nft
        require(msg.sender != nft.owner, "Yo own this our nft"); 
        require(msg.sender != address(0), "Invalid Transaction");
        require(msg.value >= _bidPrice, "You Don't Have Enough Eth To Bid");
       
        require(nft.inAunction, "Nft is not in Aucton"); // checks to see nft is in auction
        // require(block.timestamp - nft.start_time <= auctionTime, "No longer in auction");
        require(
            msg.value >= nft.currentHighestBid,
            "Current Bid Price is Higher than your Balance"
        );
        
        if (nft.currentHighestBidder != nft.owner) {
            require(address(this).balance > nft.currentHighestBid, "No balance found for this nft"); 
            payable(nft.currentHighestBidder).transfer(nft.currentHighestBid);
        }
   
        nft.currentHighestBidder = msg.sender;
        nft.currentHighestBid = msg.value;
    }

    function endAuction(uint _tokenId) public payable  {
        require(ownerOf(_tokenId) != msg.sender, "Invalid Transaction"); // contract is the owner
        require(msg.sender != address(0), "Invalid Transaction"); 
        NFTInExchange storage nft = Exchange[_tokenId]; // current nft
        require(nft.owner == msg.sender, "Invalid transaction");
        // require(block.timestamp - nft.start_time >= auctionTime, "Still in Auction");
        if (nft.currentHighestBidder != nft.owner) {
            require(address(this).balance > nft.currentHighestBid, "No balance found for this nft");
            payable(nft.owner).transfer(nft.currentHighestBid); // pay the last owner
            nft.owner = nft.currentHighestBidder;
        }

        nft.listed = false;
        nft.currentHighestBid = 0; // reset the current heighest bid 
        nft.inAunction = false; // remove from auction
        _transfer(address(this), nft.currentHighestBidder, _tokenId);
    }

    function makeOffer(uint256 _tokenId, uint _offerPrice) public payable {
        require(ownerOf(_tokenId) != msg.sender, "Invalid Transaction");
        NFTInExchange storage nft = Exchange[_tokenId]; // current nft
        require(msg.sender != nft.owner, "Yo own this our nft");
        require(msg.value >= _offerPrice, "Your balance is low");
        require(nft.listed == true, "NFT not available for offers");

        // TODO: Check for nft in auctions
        require(msg.value >= nft.currentHighestBid, "Offer Price Less than previous Bids/Offers");
        if (nft.currentHighestBidder != nft.owner) {
            require(address(this).balance > nft.currentHighestBid, "No balance found for this nft"); 
            payable(nft.currentHighestBidder).transfer(nft.currentHighestBid); // pay the last highest bidder
        }

        nft.currentHighestBidder = msg.sender;
        nft.currentHighestBid = msg.value;
        nft.offered = true;
    }

    function endOffer(uint256 _tokenId) public payable {
        require(ownerOf(_tokenId) != msg.sender, "Invalid Transaction"); // contract is the owner
        require(msg.sender != address(0), "Invalid Transaction");

        NFTInExchange storage nft = Exchange[_tokenId];
        require(nft.offered == true, "Offer not found");
        require(nft.owner == msg.sender, "Invalid transaction");

        // Accpets the offer
        if (nft.currentHighestBidder != nft.owner) {
            require(address(this).balance > nft.currentHighestBid, "No balance found for this nft"); 
            payable(nft.owner).transfer(nft.currentHighestBid); // pay the last highest bidder
        }

        nft.offered = false;
        nft.listed = false;
        nft.owner = nft.currentHighestBidder;
         _transfer(address(this), nft.currentHighestBidder, _tokenId);
    }
}
