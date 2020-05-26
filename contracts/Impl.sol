// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

contract Impl {
    address public _temp;
    uint256 public _stored;

    function hello() external pure returns(string memory message) {
        message = "Hello World";
    }

    function store(uint256 value) external returns(bool) {
        _stored = value;
        return true;
    }

    function temp() external view returns(address) {
        return _temp;
    }
}
