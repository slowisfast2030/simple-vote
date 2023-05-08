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
