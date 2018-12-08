pragma solidity ^0.4.24;

import "./Ownable.sol";
import "./LoomyToken.sol";

contract DietManager is Ownable {
    event DietData(address indexed party, string ipfsHash); //party ---> msg.sender
    event ListingCreated(address indexed party, uint indexed listingID, string ipfsHash);
    event ListingUpdated(address indexed party, uint indexed listingID, string ipfsHash);
    event ListingData(address indexed party, uint indexed listingID, string ipfsHash);
    event OfferCreated (address indexed party, uint indexed listingID, uint indexed offerID, string ipfsHash);
    event OfferAccepted (address indexed party, uint indexed listingID, uint indexed offerID, string ipfsHash);
    event OfferFinalized (address indexed party, uint indexed listingID, uint indexed offerID, string ipfsHash);
    event OfferData(address indexed party,uint indexed listingID, uint indexed offerID, string ipfsHash);

    constructor(address _tokenAddr) public {
        setTokenAddr(_tokenAddr);
        owner = getOwner();
    }

    struct Listing {
        address seller;
    }

    mapping(address => mapping(uint => bool)) buyerHasListing;

    LoomyToken public token;
    address private owner;

    Listing[] public listings;

    function setTokenAddr(address _tokenAddr) public onlyOwner {
        token = LoomyToken(_tokenAddr);
    }

    function createListing (string _ipfsHash) public {
        token.transferFrom(owner, msg.sender, 50);
        _createListing(msg.sender, _ipfsHash);
        buyerHasListing[msg.sender][listings.length - 1] = true;
    }

    function _createListing (address _seller, string _ipfsHash) internal {
        listings.push(Listing({
            seller : _seller
            }));

        emit ListingCreated(_seller, listings.length - 1, _ipfsHash);
    }

    function buyListing (uint _listingID, address seller) {
        token.transferFrom(msg.sender, seller, 30);
        buyerHasListing[msg.sender][_listingID] = true;
    }

    function checkBuyerOwnership (uint _listingID) public view returns (bool) {
        return buyerHasListing[msg.sender][_listingID];
    }

    function balanceOf(address owner) public view returns (uint256) {
        return token.balanceOf(owner);
    }
}
