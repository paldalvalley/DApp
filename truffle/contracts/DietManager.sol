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

    LoomyToken public token;
    address private owner;

    Listing[] public listings;

    function setTokenAddr(address _tokenAddr) public onlyOwner {
        token = LoomyToken(_tokenAddr);
    }

    function createListing (string _ipfsHash) public {
        token.transferFrom(owner, msg.sender, 100);
        _createListing(msg.sender, _ipfsHash);
    }

    function _createListing (address _seller, string _ipfsHash) internal {
        listings.push(Listing({
            seller : _seller
            }));

        emit ListingCreated(_seller, listings.length-1, _ipfsHash);
    }
}
