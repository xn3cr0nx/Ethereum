// infura or blockcipher api to interact with the main ethereum network
const endpoint = "https://mainnet.infura.io/MfpaEUWKkRflfyBaXOQO"
const Web3 = require("web3)
const EthTx = require("ethereumjs-tx")
const web3 = new Web3(new Web3.providers.HttpProvider(endpoint))

let addr1 = "0x41D5233f434d98b73F22Ce664D48bE06F4eb073F"
let addr2 = "0x3833ddA0AEB6947b98cE454d89366cBA8Cc55528"

let rawTx = {
	nonce: web3.toHex(web3.eth.getTransactionCount(addr1)),
	to: addr2,
	gasPrice: web3.toHex(21000000000),
	gasLimit: web3.toHex(21000),
	value: web3.toHex(web3.toWei(1, "ether)),
	data: ""
}

const pKey1 = "..."
const pKey1x = new Buffer(pKei1, "hex")

let tx = new EthTx(rawTx)
tx.sign(pKey1x)
let serializedTx = `0x${tx.serialize().toString('hex')}`

web3.eth.sendRawTransaction(serializedTx, (err, data) => {
	if(!err) console.log(data)
	else console.log(err) 
})