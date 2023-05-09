const solc = require('solc');
const fs = require('fs').promises;
const Web3 = require('web3');

const providerUrl = "http://127.0.0.1:8545";
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const contractFileName = "./contracts/Bytes.sol";

// Cache the compiled code to be reused later
let cachedCompiledCode = null;

async function loadContractFile() {
  try {
    // Read the contract file asynchronously
    const sourceCode = await fs.readFile(contractFileName, 'utf-8');

    return sourceCode;
  } catch (err) {
    console.error(err);
  }
}

async function compileContract(sourceCode) {
  if (cachedCompiledCode !== null) {
    // Use the cached version if available
    return cachedCompiledCode;
  }

  // Compile the Solidity code
  const compiledCode = solc.compile(sourceCode);

  // Cache the compiled code for future use
  cachedCompiledCode = compiledCode;

  return compiledCode;
}

async function deployContract() {
  try {
    // Load the Solidity source code from file
    const sourceCode = await loadContractFile();

    // Compile the Solidity code
    const compiledCode = await compileContract(sourceCode);

    // Get the first account to deploy the contract from
    const accounts = await web3.eth.getAccounts();
    const fromAccount = accounts[0];

    // Deploy the contract using the compiled bytecode and ABI definition
    const abiDefinition = JSON.parse(compiledCode.contracts[':Bytes'].interface);
    const bytecode = compiledCode.contracts[':Bytes'].bytecode;
    const BytesContract = new web3.eth.Contract(abiDefinition);
    const byteContract = await new Promise((resolve, reject) => {
      BytesContract.deploy({ data: bytecode })
        .send({ from: fromAccount, gas: 4700000 })
        .on('error', (err) => { reject(err); })
        .then((newContractInstance) => { resolve(newContractInstance); });
    });

    console.log('Contract deployed at address:', byteContract.options.address);
    return byteContract.options.address;
  } catch (err) {
    console.error(err);
  }
}

deployContract();
