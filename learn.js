// 在truffle console环境下，遍历accounts，返回balance
web3.eth.getAccounts (function (err, accounts) {
    if (err) console.error (err);
    else {
      accounts.forEach (function (account) {
        web3.eth.getBalance (account, function (err, balance) {
          if (err) console.error (err);
          else console.log (account + ": " + balance);
        });
      });
    }
  });

// js遍历数组

// 使用for...of循环
const numbers = [1, 2, 3, 4, 5];
for (let num of numbers) {
  console.log(num); // 依次打印1, 2, 3, 4, 5
}

// 使用forEach方法
const numbers2 = [1, 2, 3, 4, 5];
numbers2.forEach(function (num) {
  console.log(num); // 依次打印1, 2, 3, 4, 5
});

/**
accounts.forEach(function(account){balance = await web3.eth.getBalance(account)})
SyntaxError: await is only valid in async functions and the top level bodies of modules

这个错误的原因是你在一个普通的函数中使用了await关键字，
而await只能在异步函数（async function）或者模块的顶层中使用。
await关键字用于等待一个Promise对象的结果，而web3.eth.getBalance是一个返回Promise对象的异步函数。
 */

// 要解决这个错误，你有两种方法：
// 一种方法是把forEach的回调函数改成异步函数，即在function前面加上async关键字，例如：
accounts.forEach(async function(account) {
    balance = await web3.eth.getBalance(account);
    // do something with balance
  });

// 另一种方法是不使用await关键字，而是使用then方法来处理Promise对象的结果，例如：
accounts.forEach(function(account) {
    web3.eth.getBalance(account).then(function(balance) {
      // do something with balance
    });
  });

// 改为回调函数
accounts.forEach(function(account) {
    web3.eth.getBalance(account, function(err, balance) {
      if (err) {
        console.error(err); // 处理错误
      } else {
        // do something with balance
      }
    });
  });

/**
truffle(Voting)> ins.methods
{
  'candidateList(uint256)': [Function (anonymous)] {
    call: [Function (anonymous)],
    sendTransaction: [Function (anonymous)],
    estimateGas: [Function (anonymous)],
    request: [Function (anonymous)]
  },
  'votesReceived(bytes32)': [Function (anonymous)] {
    call: [Function (anonymous)],
    sendTransaction: [Function (anonymous)],
    estimateGas: [Function (anonymous)],
    request: [Function (anonymous)]
  },
  'totalVotesFor(bytes32)': [Function (anonymous)] {
    call: [Function (anonymous)],
    sendTransaction: [Function (anonymous)],
    estimateGas: [Function (anonymous)],
    request: [Function (anonymous)]
  },
  'voteForCandidate(bytes32)': [Function (anonymous)] {
    call: [Function (anonymous)],
    sendTransaction: [Function (anonymous)],
    estimateGas: [Function (anonymous)],
    request: [Function (anonymous)]
  },
  'validCandidate(bytes32)': [Function (anonymous)] {
    call: [Function (anonymous)],
    sendTransaction: [Function (anonymous)],
    estimateGas: [Function (anonymous)],
    request: [Function (anonymous)]
  }
}

truffle(Voting)> ins.methods['candidateList(uint256)']
[Function (anonymous)] {
  call: [Function (anonymous)],
  sendTransaction: [Function (anonymous)],
  estimateGas: [Function (anonymous)],
  request: [Function (anonymous)]
}

truffle(Voting)> ins.candidateList
[Function (anonymous)] {
  call: [Function (anonymous)],
  sendTransaction: [Function (anonymous)],
  estimateGas: [Function (anonymous)],
  request: [Function (anonymous)]
}
*/