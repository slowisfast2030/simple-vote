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
    from: '0x0d432780D47bc46F84068e2cF83916B6289C0FdD'
    to: '0xbE3Be9BD3fB55509ee0205356F6201c19EE15F5D'
    data: '0xcc9ab2675678000000000000000000000000000000000000000000000000000000000000'
    })
```

## 更加简单的获取data字段的方法呢

```js
truffle console> ins.voteForCandidate.request('0x5678')
```

返回

```js
{
  from: '0x0d432780D47bc46F84068e2cF83916B6289C0FdD',
  to: '0xbE3Be9BD3fB55509ee0205356F6201c19EE15F5D'，
  data: '0xcc9ab2675678000000000000000000000000000000000000000000000000000000000000'
}
```

# data location

## example

```solidity
   pragma solidity ^0.8.0;

   contract Example {
       struct Data {
           uint x;
           uint y;
       }

       Data[] public data;
   }

   // 我们可以定义不同类型和不同data location的函数来操作这个数组，比如：

   // external函数，参数使用calldata
   function addData (Data calldata _data) external {
       data.push(_data); // 将参数复制到存储中的数组
   }

   // public函数，参数使用memory
   function updateData (uint _index, Data memory _data) public {
       data[_index] = _data; // 将参数复制到存储中的数组元素
   }

   // internal函数，参数使用storage
   function swapData (uint _i, uint _j) internal {
       Data storage temp = data[_i]; // 创建一个指向存储中数组元素的引用
       data[_i] = data[_j]; // 将数组元素交换
       data[_j] = temp;
   }

   // private函数，参数使用memory
   function compareData (Data memory _a, Data memory _b) private pure returns (bool) {
       return _a.x + _a.y > _b.x + _b.y; // 比较两个参数的和
   }

```

## 规则

值类型不需要指定data location
引用类型需要指定data location
