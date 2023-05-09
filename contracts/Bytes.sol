// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract BytesExample {
    
    function test() public pure returns (byte, byte){
        // 创建一个长度为200的bytes变量
        bytes memory b = new bytes(200);
        // 修改第一个元素为0x01
        b[0] = 0x01;
        b[1] = 0x02;
        // 直接返回第二个元素，不需要再创建变量x
        return (b[0], b[1]);
    }
}
