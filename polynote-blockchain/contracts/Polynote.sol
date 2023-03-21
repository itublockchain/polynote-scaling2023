// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Polynote {
    mapping(address => mapping(string => address[])) sharedAddresses;

    event Shared(address owner, string noteId, address partner);
    event Unshared(address owner, string noteId, address partner);

    function addPartners(
        string memory _noteId,
        address[] memory _partners
    ) public {
        for (uint256 i = 0; i < _partners.length; ++i) {
            sharedAddresses[msg.sender][_noteId].push(_partners[i]);
            emit Shared(msg.sender, _noteId, _partners[i]);
        }
    }

    function removePartners(
        string memory _noteId,
        address[] memory _partners
    ) public {
        for (uint256 i = 0; i < _partners.length; ++i) {
            delete sharedAddresses[msg.sender][_noteId][i];
        }
    }

    function setPartners(
        string memory _noteId,
        address[] memory _partners
    ) public {
        this.removePartners(_noteId, _partners);
        this.addPartners(_noteId, _partners);
    }

    function isShared(
        address _owner,
        string memory _noteId,
        address _partner
    ) public view returns (bool) {
        bool shared;
        for (uint i = 0; i < sharedAddresses[_owner][_noteId].length; ++i) {
            if (sharedAddresses[_owner][_noteId][i] == _partner) {
                shared = true;
            }
        }
        return shared;
    }

    function getSharedAddresses(
        address _owner,
        string memory _noteId
    ) public view returns (address[] memory) {
        return sharedAddresses[_owner][_noteId];
    }
}
