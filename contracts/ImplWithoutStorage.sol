// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

contract ImplWithoutStorage {
    function hello() external pure returns(string memory message) {
        message = "Hello Word";
    }
}
