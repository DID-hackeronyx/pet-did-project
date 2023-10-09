// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DIDRegistryOnChain is Ownable{

   constructor(address initialOwner) Ownable(initialOwner) {
    }
  /*
   * @notice Maps ID hash to address for fast verification.
   */

  struct Type_vc {

    bool isEnable ;
    bytes32 hashdata ;

  }

  mapping( address => bool ) issuer ;
  mapping( bytes32 => Type_vc ) public registry_vc ;
  mapping( bytes32 => bool ) public registry_subject ;

  modifier issuercheck( address _issuer ) {
       require( issuer[ _issuer ] == true ) ;
       _;
  }

  /**
   * @notice Adds an ID
   *
   * @param _method ID domain
   * @param _id ID address
   */
  function register_vc(string calldata _method, address _id , bytes32 record )  external {
    bytes32 hash = keccak256(abi.encodePacked('did:', _method, ':', _id));
    registry_vc[ hash ].hashdata = record ;
    registry_vc[ hash ].isEnable = true ;
  }
  function deactivate_vc(string calldata _method, address _id) external {
    bytes32 hash = keccak256(abi.encodePacked('did:', _method, ':', _id));
    registry_vc[ hash ].isEnable = false ;
  }

  function isActive_vc(string calldata _method, address _id) public view returns (bool status) {
     bytes32 hash = keccak256(abi.encodePacked('did:', _method, ':', _id));
     status = registry_vc[ hash ].isEnable ;
  }

  function register_subject(string calldata _method, address _id )  external {
    bytes32 hash = keccak256(abi.encodePacked('did:', _method, ':', _id));
    registry_subject[ hash ] = true ;
  }

  function deactivate_subject(string calldata _method, address _id)  external {
    bytes32 hash = keccak256(abi.encodePacked('did:', _method, ':', _id));
    registry_subject[ hash ] = false ;
  }

  function isActive_subject(string calldata _method, address _id) public view returns (bool status) {
     bytes32 hash = keccak256(abi.encodePacked('did:', _method, ':', _id));
     status = registry_subject[ hash ] ;
  }
  
}