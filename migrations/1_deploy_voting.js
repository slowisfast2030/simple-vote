var Voting = artifacts.require("Voting.sol");

module.exports = function(deployer) {
    var bytesArray = ["0x1234", "0x5678", "0x9abc"];
    deployer.deploy(Voting, bytesArray);
    }

// 这里确实是一个好问题。
// 构造函数初始化是一个bytes32数组。那么这里如何进行初始化呢？
