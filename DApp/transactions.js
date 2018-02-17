const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

console.log("accounts", web3.eth.accounts)
console.log("balance account 0", web3.eth.getBalance(web3.eth.accounts[0]))
console.log("balance account 0 in ether", web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0])), "ether")

let acc1 = web3.eth.accounts[0]
let acc2 = web3.eth.accounts[1]

let balance = (acc) => { return web3.fromWei(web3.eth.getBalance(acc), "ether").toNumber() }
//21000 is the cost in gas of the transaction
let txHash = web3.eth.sendTransaction({from: acc1, to: acc2, value: web3.toWei(1, "ether"), gasLimit: 21000, gasPrice: 20000000000})
assert.equal(balance(acc2), 101, "ether not transfered")

web3.eth.getTransaction(txHash)

web3.eth.sendTransaction({from: acc1, to: acc2, value: web3.toWei(1, "ether"), gasLimit: 21000, gasPrice: 20000000000, nonce: web3.eth.getTransactionCount(acc1)})

const pK1 = '6233c52f7587b5468470eadd7c83bdfc1cb97c181ab99efd6a1e6cf6fe99364b'
const EthTx = require("ethereumjs-tx")
//ethereumjs-tx library requires a buffer to interact with
let pK1x = new Buffer(pK1, "hex")
let rawTx = {
	nonce: web3.toHex(web3.eth.getTransactionCount(acc1)),
	to: acc2,
	gasPrice: web3.toHex(20000000000),
	gasLimit: web3.toHex(21000),
	value: web3.toHex(web3.toWei(25, "ether")),
	data: ""
}
//we sign the transaction
let tx = new EthTx(rawTx)
tx.sign(pK1x)
//this transaction is now secure, but is a transaction, you can use it, you can send a transaction using sendRawTransaction
let signedTx = tx.serialize().toString('hex')
web3.eth.sendRawTransaction(`0x${signedTx}`, (err, data) => {
	if(!err) console.log(data)
})
