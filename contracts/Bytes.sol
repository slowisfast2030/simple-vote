// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract BytesExample {
    
    function test() public pure returns (byte, byte){
        // 创建一个仅含两个元素的bytes变量
        bytes2 b;
        // 修改第一个元素为0x01，第二个元素为0x02
        b = hex"0102";
        // 直接返回前两个元素
        return (b[0], b[1]);
    }
}
