//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma abicoder v2; // required to accept structs as function parameters

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.3.1/contracts/access/AccessControl.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.3.1/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.3.1/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.3.1/contracts/utils/cryptography/draft-EIP712.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract SmartContract is ERC721, EIP712, AccessControl, Ownable {

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  string private constant SIGNING_DOMAIN = "NFT-Voucher";
  string private constant SIGNATURE_VERSION = "1";
  uint256 public minCost; 
  string public baseURI;
  uint256 public tokenCounter;
  uint256 public maxToken;
  uint256 public maxMintPerTx = 10;
  bool public isOnSale = true;

  mapping(uint256 => string) private _tokenURIs;
  mapping(bytes => uint256) private _vouchersRedeemed;
  mapping(address => uint256) pendingWithdrawals;

  struct NFTVoucher {
    uint256 minPrice; // in wei
    uint256 supply; // total supply of this voucher signature, zero supply means infinite
    uint256 expiration; // expiration of this voucher
    uint256 maxRedeem;  // max redeem per tx
    string uri; // uri for tokenURI
    bytes signature; // signature of this voucher
  }

  constructor(address payable minter, string memory baseTokenURI, uint256 maxTokenCount, uint256 minPrice)
    ERC721("Savage Werewolf Society", "SWS") 
    EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {
      _setupRole(MINTER_ROLE, minter);
        baseURI = baseTokenURI;
        maxToken = maxTokenCount;
        tokenCounter = 0;
        minCost = minPrice;
    }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }

        // check if _tokenURI starts with http, if start with http return without base as prefix
        if (bytes(_tokenURI).length>4) {
          bytes memory characters = new bytes(4);
          characters[0] = bytes(_tokenURI)[0];
          for(uint i = 0; i < 4; i++) {
            characters[i] = bytes(_tokenURI)[i];
          }
          if(keccak256(bytes(string(characters))) == keccak256(bytes("http"))){
            return _tokenURI;
          }
        }

        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
  }

  function mintNFT(uint256 qty) public payable {
        require(isOnSale, "Sale must be active to mint");
        require(qty <= maxMintPerTx, "Can only mint 20 tokens at a time");
        require(tokenCounter + qty <= maxToken, "Purchase would exceed max avaliable");
        require(msg.value >= minCost * qty, "Insufficient funds to redeem");
        
        for(uint256 i = 0; i < qty; i++) {
          tokenCounter += 1;
          _safeMint(msg.sender, tokenCounter);
        }
  }
  
  //  Returns a hash of the given NFTVoucher, prepared using EIP712 typed data hashing rules.
  //  url can be empty
  function _hash(NFTVoucher calldata voucher) internal view returns (bytes32) {
    return _hashTypedDataV4(keccak256(abi.encode(
      keccak256("NFTVoucher(uint256 minPrice,uint256 supply,uint256 expiration,uint256 maxRedeem,string uri)"),
      voucher.minPrice,
      voucher.supply,
      voucher.expiration,
      voucher.maxRedeem,
      keccak256(bytes(voucher.uri))
    )));
  }

  function redeem(address redeemer, NFTVoucher calldata voucher, uint256 qty) public payable returns (uint256) {
    // make sure signature is valid and get the address of the signer
    address signer = _verify(voucher);
    // make sure that the signer is authorized to mint NFTs
    require(hasRole(MINTER_ROLE, signer), "Signature invalid or unauthorized");
    require(isOnSale, "Sale must be active to mint");
    require(qty <= voucher.maxRedeem, "Purchase would exceed max avaliable");
    
    require(tokenCounter + qty <= maxToken, "Purchase would exceed max avaliable");
    require(_vouchersRedeemed[voucher.signature] + qty <= voucher.supply || voucher.supply == 0, "Vouchers are fully redeemed");
    require(msg.value >= voucher.minPrice * qty, "Insufficient funds to redeem");
    require(block.timestamp <= voucher.expiration, "Voucher is expired");
    

    // first assign the token to the signer, to establish provenance on-chain
    for(uint256 i = 0; i < qty; i++) {
      tokenCounter += 1;
      _safeMint(signer, tokenCounter);
      if (bytes(voucher.uri).length>0) {
        _setTokenURI(tokenCounter, voucher.uri);
      }
      // transfer the token to the redeemer
      _transfer(signer, redeemer, tokenCounter);

    }
          // update voucher supply, when supply is set to 0, it means indefinite
    if(voucher.supply > 0){
        if(_vouchersRedeemed[voucher.signature] == 0){
          _vouchersRedeemed[voucher.signature] = qty;
        }else{
          _vouchersRedeemed[voucher.signature] += qty;
        }
    }
    // record payment to signer's withdrawal balance
    pendingWithdrawals[signer] += msg.value;
    return tokenCounter;
  }

  function mint(address recipient, string memory uri, uint256 qty) public onlyOwner {

    for(uint256 i = 0; i < qty; i++) {
      tokenCounter += 1;
      _safeMint(recipient, tokenCounter);
      if (bytes(uri).length>0) {
        _setTokenURI(tokenCounter, uri);
      }
    }

    if(maxToken<=tokenCounter){
      maxToken = tokenCounter;
    }
  }

  function setMinCost(uint256 minPrice)public onlyOwner {
        minCost = minPrice;
  }

  function setMaxToken(uint256 maxTokenAllow)public onlyOwner {
        maxToken = maxTokenAllow;
  }

  function setIsOnSale(bool onSale)public onlyOwner {
        isOnSale = onSale;
  }

  function setTokenURL(uint256 tokenId, string memory uri)
        public onlyOwner
  {
        _setTokenURI(tokenId, uri);
  }

  function setBaseURI(string memory newBaseURI) public onlyOwner {
        baseURI = newBaseURI;
  }

  function availableToMint() public view returns (uint256) {
      return maxToken - tokenCounter;
  }

  function getAvailableVoucher(NFTVoucher calldata voucher) public view returns (uint256) {

      if(voucher.supply==0){

        return availableToMint();

      }else{

        return Math.min(voucher.supply - _vouchersRedeemed[voucher.signature], availableToMint());
      
      }
  }

  function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
  }

  function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
  }
  
  function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
  }

  function withdraw() public onlyOwner {
    uint balance = address(this).balance;
    address payable receiver = payable(msg.sender);
    receiver.transfer(balance);
  }

  //  Retuns the amount minimum cost a token
  function getMintCost() public view returns (uint256) {
    return minCost;
  }

  function getChainID() external view returns (uint256) {
    uint256 id;
    assembly {
        id := chainid()
    }
    return id;
  }

  function getMaxToken() external view returns (uint256) {
    return maxToken;
  }

  ///  Verifies the signature for a given NFTVoucher, returning the address of the signer.
  function _verify(NFTVoucher calldata voucher) internal view returns (address) {
    bytes32 digest = _hash(voucher);
    return ECDSA.recover(digest, voucher.signature);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override (AccessControl, ERC721) returns (bool) {
    return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
  }

}
