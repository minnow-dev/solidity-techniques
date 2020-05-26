// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

contract ProxyWithImmutable {
    address immutable public _impl;

    constructor(address impl) public {
        _impl = impl;
    }

    fallback() external payable {
        address impl = _impl;
        assembly {
            let _target := impl
            calldatacopy(0x0, 0x0, calldatasize())
            let result := delegatecall(gas(), _target, 0x0, calldatasize(), 0x0, 0)
            returndatacopy(0x0, 0x0, returndatasize())
            switch result case 0 {revert(0, 0)} default {return (0, returndatasize())}
        }
    }
}
