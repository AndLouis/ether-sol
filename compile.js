const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts','Inbox.sol');



const source = fs.readFileSync(inboxPath, 'utf8');
let compilerInput = {
    language: 'Solidity',
    sources:
    {
        'Inbox.sol': 
        {
            content: source
        }
    },
    settings:
    {
        optimizer:
        {
            enabled: true
        },
        outputSelection:
        {
            '*':{
                '*':['*']
                }
            }
        }
    };
    console.log('compiling contract');
    let compiledContract =  JSON.parse(solc.compile(JSON.stringify(compilerInput)));
    console.log('Contract Compiled');
    // for (let contractName in compiledContract.contracts['Inbox.sol'])
    //     {
    //         console.log(compiledContract.contracts['Inbox.sol'][contractName]);
    //     }

    //console.log(compiledContract.contracts['Inbox.sol']['Inbox']);
  
    //  for (var contractName in compiledContract.contracts['Inbox.sol']) {
    //      console.log(contractName + ': ' + compiledContract.contracts['Inbox.sol'][contractName].evm.bytecode)
    //  }
//module.exports = compiledContract.contracts['Inbox.sol']['Inbox'];

const interface = compiledContract.contracts['Inbox.sol']['Inbox'].abi;
//console.log(interface);
const bytecode = compiledContract.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;

module.exports = {
    interface,
    bytecode
}