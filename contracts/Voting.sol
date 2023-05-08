// SPDX-License-Identifier: MIT

pragma solidity ^0.5.16;

contract Voting {
    mapping (bytes32 => uint8) public votesReceived;
    bytes32[] public candidateList;

    // bytes32[] candidateList = [bytes32("Alice"), bytes32("Bob")];
    constructor(bytes32[] memory candidateNames) public {
        candidateList = candidateNames;
    }

    // 获取某个候选人的总票数
    function totalVotesFor(bytes32 candidate) view public returns (uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    // 投票给某个候选人
    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    // Check if the candidate is valid
    // 所有的被投票对象是一个数组。如何检测一个元素是否在数组中？没有简单的in操作。只能循环遍历。
    function validCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }

}