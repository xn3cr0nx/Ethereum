const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const solc = require("solc")

const buyer = web3.eth.accounts[0]
const seller = web3.eth.accounts[1]
const arbiter = web3.eth.accounts[2]

let source = `contract Escrow {

  address public buyer;
  address public seller;
  address public arbiter;

  function Escrow(address _seller, address _arbiter) payable {
    buyer = msg.sender;
    seller = _seller;
    arbiter = _arbiter;
  }

  function payoutToSeller() {
    if(msg.sender == buyer || msg.sender == arbiter) {    
      seller.send(this.balance);
    }
  }

  function refundToBuyer() {
    if(msg.sender == seller || msg.sender == arbiter) {     
      buyer.send(this.balance);
    }
  }

  function getBalance() constant returns (uint) {
    return this.balance;
  }

}
`
let compiled = solc.compile(source)
let abi = JSON.parse(compiled.contracts[':Escrow'].interface)
let escrowContract = web3.eth.contract(abi)

let deployed = escrowContract.new(seller, arbiter, {
from: web3.eth.accounts[0],
data: compiled.contracts[':Escrow'].bytecode,
gas: 4700000,
gasPrice: 5,
value: web3.toWei(5, "ether")
}, (err, contract) => {})

deployed.payoutToSeller({from: buyer})