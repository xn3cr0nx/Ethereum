const Web3 = require("web3")
const web3 = new Web3

//every 64 character string is a ethereum valid private key

//the address is exactly 40 digits long, but this isn't the entire public key
//0x is just a declaration added to the address
const EthUtil = require("ethereumjs-util")

let hexToBytes = function(hex) {
  for (var bytes = [], c = 0; c < hex.length; c+=2)
    bytes.push(parseInt(hex.substr(c, 2), 16))
  return bytes
}

let privateKeyToAddress = function(privateKey) {
  return `0x${EthUtil.privateToAddress(hexToBytes(privateKey)).toString('hex')}`
}

console.log("PublicKey", privateKeyToAddress(process.argv[2]))
//ex 1.repeat(64)

//sha3 hashes a string into 64 characters, usable as private key
//console.log(web3.sha3('example string to generate an address'))
