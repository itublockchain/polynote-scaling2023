// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Polynote {
<<<<<<< HEAD
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
=======
    mapping(address => mapping(uint => mapping(address => bool))) sharedAddresses;

    event Shared(address owner, uint notId, address partner);
    event Unshared(address owner, uint notId, address partner);

    function addPartners(uint _notId, address[] memory _partners) public {
        for (uint256 i = 0; i < _partners.length; ++i) {
            require(
                sharedAddresses[msg.sender][_notId][_partners[i]] == false,
                "Already shared!"
            );
            sharedAddresses[msg.sender][_notId][_partners[i]] = true;

            emit Shared(msg.sender, _notId, _partners[i]);
        }
    }

    function removePartners(uint _notId, address[] memory _partners) public {
        for (uint256 i = 0; i < _partners.length; ++i) {
            require(
                sharedAddresses[msg.sender][_notId][_partners[i]] == true,
                "This address is not your partner."
            );
            sharedAddresses[msg.sender][_notId][_partners[i]] = false;

            emit Shared(msg.sender, _notId, _partners[i]);
        }
>>>>>>> contract
    }

    function isShared(
        address _owner,
<<<<<<< HEAD
        address _partner
    ) public view returns (bool) {
        return sharedAddresses[_owner][_partner];
=======
        uint _notId,
        address _partner
    ) public view returns (bool) {
        return sharedAddresses[_owner][_notId][_partner];
>>>>>>> contract
    }
}
