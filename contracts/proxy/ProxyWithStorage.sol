// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

contract ProxyWithStorage {
    address public _impl;

    constructor(address impl) public {
        _impl = impl;
    }

    fallback() external payable {
        assembly {
            let _target := sload(0)
            calldatacopy(0x0, 0x0, calldatasize())
            let result := delegatecall(gas(), _target, 0x0, calldatasize(), 0x0, 0)
            returndatacopy(0x0, 0x0, returndatasize())
            switch result case 0 {revert(0, 0)} default {return (0, returndatasize())}
        }
    }
}
