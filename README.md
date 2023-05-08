
# web3.js
我们与区块链进行通信的方式是通过RPC。

web3.js是一个JavaScript库，它抽象出了所有的RPC调用，以便于你可以通过JavaScript与区块链进行交互。另一个好处是，web3.js能够让你使用你最喜欢的JavaScript框架构建非常棒的web应用。

# 如何通过函数选择器进行函数调用
## 如何获取函数选择器
```js
truffle console> web3.utils.keccak256('voteForCandidate(bytes32)').slice(0,10)
```
返回
```js
'0xcc9ab267'
```

## 发起函数调用的交易
```javascript
web3.eth.sendTransaction({
    from:'0x0d432780D47bc46F84068e2cF83916B6289C0FdD'
    to:'0xbE3Be9BD3fB55509ee0205356F6201c19EE15F5D'
    data:'0xcc9ab2675678000000000000000000000000000000000000000000000000000000000000'
    })
```

## 更加简单的获取data字段的方法呢
```js
truffle console> ins.voteForCandidate.request('0x5678')
```

返回

```
{
  from: '0x0d432780D47bc46F84068e2cF83916B6289C0FdD',
  to: '0xbE3Be9BD3fB55509ee0205356F6201c19EE15F5D'，
  data:'0xcc9ab2675678000000000000000000000000000000000000000000000000000000000000'
}
```

