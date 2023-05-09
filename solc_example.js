const solc = require('solc');
const fs = require('fs').promises;

async function compileContract() {
  try {
    // Load the Solidity source code from a file
    const sourceCode = await fs.readFile('./contracts/Bytes.sol', 'utf-8');

    // Compile the source code
    const compiledCode = solc.compile(sourceCode);

    // Print only the compiled code
    //console.log(compiledCode.contracts[':Bytes']);
    console.log(sourceCode)
    console.log(compiledCode)

    return compiledCode;
  } catch (err) {
    console.error(err);
  }
}

compileContract();
