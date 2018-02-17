const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const solc = require("solc")

let source = `contract HelloWorld {
	function displayMessage() constant returns (string) {
		return "Hello from a smart contract";
	}
}`

let compiled = solc.compile(source)
console.log("complied contract", compiled)
console.log("bytecode", compiled.contracts[':HelloWorld'].bytecode)
console.log("opcode", compiled.contracts[':HelloWorld'].opcodes)
console.log("interface", compiled.contracts[':HelloWorld'].interface)

let abi = JSON.parse(compiled.contracts[':HelloWorld'].interface)

let helloWorldContract = web3.eth.contract(abi)
//check solidity online compiler to estimate the gas nneeded
let deployed = helloWorldContract.new({
from: web3.eth.accounts[0],
data: compiled.contracts[':HelloWorld'].bytecode,
gas: 4700000,
gasPrice: 5,
}, (err, contract) => {})

web3.eth.getTransaction("transactionidofcreatercontract")
//address of contract
deployed.address
//new reference to deployed contract
helloWorldContract.at("address")

//call() to avoid consuming gas
deployed.displayMessage.call()




