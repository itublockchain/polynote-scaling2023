// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Polynote {
    mapping(address => mapping(uint => mapping(address => bool))) sharedAddresses;

    event Shared(address owner, uint notId, address partner);
    event Unshared(address owner, uint notId, address partner);

    function addPartners(uint _notId, address[] memory _partners) public {
        for (uint256 i = 0; i < _partners.length; ++i) {

            sharedAddresses[msg.sender][_notId][_partners[i]] = true;

            emit Shared(msg.sender, _notId, _partners[i]);
        }
    }

    function removePartners(uint _notId, address[] memory _partners) public {
        for (uint256 i = 0; i < _partners.length; ++i) {

            sharedAddresses[msg.sender][_notId][_partners[i]] = false;

            emit Shared(msg.sender, _notId, _partners[i]);
        }
    }

    function isShared(
        address _owner,
        uint _notId,
        address _partner
    ) public view returns (bool) {
        return sharedAddresses[_owner][_notId][_partner];
    }
}
