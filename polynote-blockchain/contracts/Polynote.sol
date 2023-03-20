// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Polynote {
    mapping(address => mapping(address => bool)) sharedAddresses;

    event Shared(address owner, address partner);
    event Unshared(address owner, address partner);

    function addPartner(address _partner) public {
        require(
            sharedAddresses[msg.sender][_partner] == false,
            "Already shared!"
        );
        sharedAddresses[msg.sender][_partner] = true;

        emit Shared(msg.sender, _partner);
    }

    function removePartner(address _partner) public {
        require(
            sharedAddresses[msg.sender][_partner] == true,
            "This address is not your partner."
        );
        sharedAddresses[msg.sender][_partner] = false;

        emit Shared(msg.sender, _partner);
    }

    function isShared(
        address _owner,
        address _partner
    ) public view returns (bool) {
        return sharedAddresses[_owner][_partner];
    }
}
