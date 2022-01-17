const Web3EthContract = require('web3-eth-contract');
const http = require('http')
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "controller",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "attribte",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "add_attribute",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pet_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "genetics",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "add_blank_pet",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "check_owned_pet_IDs",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "owned_pets",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "check_pet_attributes",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "res",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "check_pet_genetics",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "res",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "check_pet_id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "res",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "check_pet_name",
		"outputs": [
			{
				"internalType": "string",
				"name": "res",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "check_pet_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "res",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dir1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dir2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dir3",
				"type": "uint256"
			}
		],
		"name": "fetch_ai_data",
		"outputs": [
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "list_attributes",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "attributes",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "petIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "petIndex2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "brainIndex",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dir1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dir2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dir3",
				"type": "uint256"
			}
		],
		"name": "update_ai_dataset",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
Web3EthContract.setProvider('http://127.0.0.1:9656');
const Web3 = require("web3")
const web3 = new Web3('http://127.0.0.1:9656')
const contract = new Web3EthContract(abi, '<NFT CONTRACT ADDRESS>');

var a;
var a2;
var a3
var b = (c) => {
  a = c
}
var b2 = (c) => {
  a2 = c
}
function b3 (c) {
	a3 = c
}
web3.eth.personal.importRawKey("<PRIVATE KEY OF THE ACCOUNT THAT OWNS THE NFT>", "password")
async function write_ai(req) {
	web3.eth.personal.unlockAccount("<ADDRESS OF THE ACCOUNT THAT OWNS THE NFT>", "password")
	console.log(req[0], req[1], req[2], req[3], req[4])
	contract.methods.update_ai_dataset(index=req[0], data=req[1], dir1=req[2], dir2=req[3], dir3=req[4]).send({from: "<ADDRESS OF THE ACCOUNT THAT OWNS THE NFT>", gasPrice: 100000000, gas: 10000000})
}
async function read_ai(req) {
	var out = await contract.methods.fetch_ai_data(req[0], req[1], req[2], req[3]).call()
	return out
}
function parse_body(body) {
	var out = []
	var j = ""
	var i = 0

	while (i <= body.length){
		if (body[i] == "&") {
			out.push(j)
			j = ""
			i += 1
		}
		else {
			j += body[i]
			i += 1
		}
	}
	out2 = []
	console.log(out)
	for (var i = 0; i < out.length; i++) {
		var s = out[i]
		console.log(s)
		out2.push(s.split("=")[1])
	}
	return out2
}
contract.methods.check_pet_genetics(1).call().then(b)
contract.methods.check_pet_attributes(0).call().then(b2)
http.createServer(function(req, res) {
  res.writeHead(200)
  res.write(a.toString())
  res.end()
}).listen(8081)
http.createServer(function(req, res) {
  res.writeHead(200)
  res.write(a2.toString())
  res.end()
}).listen(8080)
http.createServer(function(req, res) {
	res.writeHead(200)
	body = ""
	console.log("recieved")
	req.on('data', chunk => {
		body += chunk.toString()
	})
	req.on('end', () => {
		write_ai(parse_body(body))
		res.end()
	})
}).listen(8083)
http.createServer(function(req, res) {
	res.writeHead(200)
	body = ""
	console.log("recieved")
	req.on('data', chunk => {
		body += chunk.toString()
		console.log(body)

	})
	req.on('end', async () => {
		var out = await read_ai(parse_body(body))
		res.write(out)
		res.end()
	})
}).listen(8084)
