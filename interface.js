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
				"name": "conclusion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "scoring",
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
				"name": "conclusion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "scoring",
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
Web3EthContract.setProvider('http://0.0.0.0:7545');
const contract = new Web3EthContract(abi, "0xD5DECD434Eba7e0872941AD45deEdc35a60dC8D2");
var a;
var a2;
var b = (c) => {
  a = c
}
var b2 = (c) => {
  a2 = c
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
