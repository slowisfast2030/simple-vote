// SPDX-License-Identifier: MIT

pragma solidity ^0.5.16;

contract Voting {
    mapping (bytes32 => uint8) public votesReceived;
    bytes32[] public candidateList;

    // bytes32[] candidateList = [bytes32("Alice"), bytes32("Bob")];
    //  Data location must be "memory" for parameter in function, but none was given.
    constructor(bytes32[] memory candidateNames) public{
        candidateList = candidateNames;
        initVotes();
    }

    function initVotes() public {
        for (uint i = 0; i < candidateList.length; i++) {
            votesReceived[candidateList[i]] = 10;
        }
    }

    // ins.printVotes().then(function(res){console.log(res[0]); console.log(res[1])})
    // ins.printVotes().then(function(res){for(i=0;i<3;i++){console.log(res[0][i]+': '+res[1][i])}})
    function printVotes() view public returns (bytes32[] memory, uint8[] memory) {
        uint len = candidateList.length;
        bytes32[] memory names = new bytes32[](len);
        uint8[] memory votes = new uint8[](len);
        
        for (uint i = 0; i < len; i++) {
            names[i] = candidateList[i];
            votes[i] = votesReceived[candidateList[i]];
        }
        return (names, votes);
    }

    // 获取某个候选人的总票数
    /**
    这个函数在truffle console环境下有如下调用方法：
    ins.totalVotesFor('0x1234')
    ins.totalVotesFor.call('0x1234')
    ins.totalVotesFor.sendTransaction('0x1234')
    前两种调用仅仅是一个call，不会修改合约状态，也不会消耗gas。
    第三种调用会发送一个交易。
     */
    /**
    这个函数不需要指定参数的数据位置，因为参数candidate是一个bytes32类型，
    它是一个值类型，而不是一个引用类型。值类型不需要指定数据位置，
    因为它们总是通过值传递，并且总是被复制到内存或栈中。
    只有引用类型（例如struct, array, mapping等）需要指定数据位置，以便编译器知道它们在哪里存储和访问。
     */
    function totalVotesFor(bytes32 candidate) view public returns (uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    // 投票给某个候选人
    /**
    这个函数在truffle console环境下有如下调用方法：
    ins.voteForCandidate('0x1234')
    ins.voteForCandidate.sendTransaction('0x1234')
    ins.voteForCandidate.call('0x1234')
    前两种调用会发送一个交易，修改合约状态，消耗gas。
    第三种应该不是正确的调用方法。
    */
    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    // Check if the candidate is valid
    // 所有的被投票对象是一个数组。如何检测一个元素是否在数组中？没有简单的in操作。只能循环遍历。
    // 但是，如果数组很大，这样的操作会消耗大量的gas。所以，我们需要一个更好的方法。
    /**
    mapping(bytes32 => bool) public candidateMap;
    
    function addCandidate(bytes32 candidate) public {
        candidateMap[candidate] = true;
    }
    
    function validCandidate(bytes32 candidate) view public returns (bool) {
        return candidateMap[candidate];
    }
     */  
    function validCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }

}