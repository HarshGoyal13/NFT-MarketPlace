// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NftMarketPlace is ERC721URIStorage, Ownable {

    uint private _tokenId;

    mapping (string => uint) existingURI;


    address public siteOwner;
    uint public royaltyFee;
    uint public TransactionId ;
    uint  MINTING_PRICE = 0.0001 ether;

    event Sale(uint256 tokenId, address indexed owner, uint256 cost, string fileURI, uint256 timestamp);
    event NFTSold(uint indexed id, address indexed buyer, address indexed seller, uint price);
    event Payment(address indexed to, uint amount);
    event PriceUpdated(uint indexed id, uint newPrice);

    struct NFTItem {
        uint256 tokenId;
        address owner;
        string title;
        string category;
        string description;
        uint price;
        string fileURI;
        uint timeStamp;
        bool isOnSale;
    }

    struct Transaction {
        uint transactionId;
        address from;
        address to;
        string nftTitle;
        uint transactionPrice;
        uint timestamp;
    }


    Transaction[] transaction;
    NFTItem[] minted;


    constructor(string memory _company, string memory _symbol, uint _royaltyFee  ) ERC721(_company, _symbol) Ownable(msg.sender) {
        royaltyFee = _royaltyFee;
        siteOwner = msg.sender;
    }


    function mintNFT(string memory _title, string memory _category, string memory _description, string memory _fileURI, uint _price) external payable  {

        require(msg.sender != siteOwner , "Owner Is not allowed To MINT NFTs");
        require(msg.value >= MINTING_PRICE, "NOT Have enough gas");

        require(payTo(siteOwner, msg.value), "PAY TO OWNER");

        minted.push(
            NFTItem (
                _tokenId,
                msg.sender,
                _title,
                _category,
                _description,
                _price,
                _fileURI,
                block.timestamp,
                true
            )
        );

        emit Sale(_tokenId, msg.sender, msg.value, _fileURI, block.timestamp);

        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _fileURI);
        existingURI[_fileURI] = _tokenId;

        _tokenId++;
    }


   function buyNFT(uint _id) external payable {
    require(msg.value >= minted[_id].price, "Ether is too Low to Purchase");
    require(msg.sender != minted[_id].owner, "Owner Not Sale");
    require(minted[_id].isOnSale == true, "Sorry! NFT NOT ON SALE");

    uint royalty = (msg.value * royaltyFee) / 100;

    // Ensure that the royalty is correctly sent to the site owner
    require(payTo(siteOwner, royalty), "Failed to transfer royalty to site owner");

    // Ensure the remaining balance is sent to the NFT owner
    require(payTo(minted[_id].owner, (msg.value - royalty)), "Failed to transfer funds to NFT owner");

    // Log the transaction
    transaction.push(
        Transaction(
            TransactionId,
            msg.sender,
            minted[_id].owner,
            minted[_id].title,
            msg.value,
            block.timestamp
        )
    );

    TransactionId++;

    // Transfer ownership
    address previousOwner = minted[_id].owner;
    minted[_id].owner = msg.sender;
    minted[_id].isOnSale = false;

    // Emit the NFT sold event
    emit NFTSold(_id, msg.sender, previousOwner, msg.value);
}


    function setprice(uint _id, uint _newAmount) external returns (bool) {
        require(_newAmount > 0 ether, "New Price Cannot be Zero");
        require(msg.sender == minted[_id].owner, "You are not the Owner of The NFT");

        minted[_id].price = _newAmount;
        minted[_id].isOnSale = true;
        emit PriceUpdated(_id, _newAmount);
        return true;
    }

    function allNFTs() external view returns (NFTItem [] memory){
        return minted;
    }

    function getAllTransactions() external view returns (Transaction[] memory){
        return transaction;
    }

   

    function getOwnerNFts(address _owner) external view returns(NFTItem [] memory){
        uint count = 0;
        for (uint i=0; i < minted.length ; i++){
            if(minted[i].owner == _owner){
                count++;
            }
        }

        NFTItem[] memory result = new NFTItem[](count);
        uint index = 0;

        for(uint i = 0; i<minted.length ; i++){
             if(minted[i].owner == _owner){
                result[index] = minted[i];
                index++;
            }
        }
        return result;

    }

    function viewTokenURI(uint256 _id) external view returns (string memory) {
     return tokenURI(_id);
    }

    function getNFTDetails(uint _id) external view returns (NFTItem [] memory){
        uint count = 0;
        for (uint i=0; i < minted.length ; i++){
            if(minted[i].tokenId == _id){
                count++;
            }
        }

        NFTItem[] memory result = new NFTItem[](count);
        uint index = 0;

        for(uint i = 0; i<minted.length ; i++){
             if(minted[i].tokenId == _id){
                result[index] = minted[i];
                index++;
            }
        }
        return result;
    }

    function payTo(address _to, uint _amount) internal returns (bool) {
    (bool success, ) = _to.call{value: _amount}("");
    require(success, "Transfer failed");
    emit Payment(_to, _amount);
    return success;
    }
   





    }