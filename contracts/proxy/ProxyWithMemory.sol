// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

contract ProxyWithMemory {
    address immutable internal _impl;
    uint256 immutable internal _storage;
    constructor(address impl, uint256 value) public {
        _impl = impl;
        _storage = value;
    }

    fallback() external payable {
        address target = _impl;
        uint256 stored = _storage;
        assembly {
            mstore(0x40, stored)
            let _target := target
            calldatacopy(0x0, 0x0, calldatasize())
            let result := delegatecall(gas(), _target, 0x0, calldatasize(), 0x0, 0)
            returndatacopy(0x0, 0x0, returndatasize())
            switch result case 0 {revert(0, 0)} default {return (0, returndatasize())}
        }
    }
}
