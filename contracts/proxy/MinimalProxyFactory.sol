// SPDX-License-Identifier: MIT
pragma solidity ^0.6.8;


import "./CloneFactory.sol";

contract MinimalProxyFactory is CloneFactory {
    event Deploy(address clone);
    function deploy(address target) external returns(address clone) {
        clone = createClone(target);
        emit Deploy(clone);
    }
}
