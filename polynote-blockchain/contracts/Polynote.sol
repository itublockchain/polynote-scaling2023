// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Polynote {
    mapping(address => mapping(string => address[])) sharedAddresses;

    event Shared(address owner, string notId, address partner);
    event Unshared(address owner, string notId, address partner);

    function addPartners(
        string memory _notId,
        address[] memory _partners
    ) public {
        for (uint256 i = 0; i < _partners.length; ++i) {
            sharedAddresses[msg.sender][_notId].push(_partners[i]);
            emit Shared(msg.sender, _notId, _partners[i]);
        }
    }

    function removePartners(
        string memory _notId,
        address[] memory _partners
    ) public {
        for (uint256 i = 0; i < _partners.length; ++i) {
            for (
                uint256 x = 0;
                i < sharedAddresses[msg.sender][_notId].length;
                ++i
            ) {
                if (sharedAddresses[msg.sender][_notId][x] == _partners[i]) {
                    delete sharedAddresses[msg.sender][_notId][x];
                    emit Shared(msg.sender, _notId, _partners[i]);
                }
            }
        }
    }

    function isShared(
        address _owner,
        string memory _notId,
        address _partner
    ) public view returns (bool) {
        bool shared;
        for (uint i = 0; i < sharedAddresses[_owner][_notId].length; ++i) {
            if (sharedAddresses[_owner][_notId][i] == _partner) {
                shared = true;
            }
        }
        return shared;
    }

    function getSharedAddresses(
        address _owner,
        string memory _notId
    ) public view returns (address[] memory) {
        return sharedAddresses[_owner][_notId];
    }
}