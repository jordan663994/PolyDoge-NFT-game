pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;
contract Pets {
    address parent;
    constructor (address controller) public {
        parent = controller;
    }
    struct baseBreed {
        string id;
        uint256 percent_of_breed;
    }
        //ai can get really big so it will need to be updated over multiple txns
    struct pet {
        uint256 ID;
        uint256 genetics;
        uint256[] add_ons;
        string name;
        address owner;
    }
    pet[] pets;
    mapping (address => uint256[]) ownership;
    mapping (address => uint256[]) ownership2;
    uint256 id_seed = 0;
    modifier onlyParent {
        require(msg.sender == parent);
        _;
    }
    struct ai {
        mapping (uint256 => mapping (uint256 => mapping(uint256 => string))) a;
        address owner;
        uint256 current_str;
    }
    ai[] AIs;
    function add_blank_pet(address pet_owner, uint256 genetics, string memory name) public onlyParent returns (bool success) {
        uint256[] memory d;
        uint256 id = uint256(uint(keccak256(abi.encodePacked(id_seed))));
        ai memory brain = ai(pet_owner, 0);
        pet memory p = pet(id, genetics, d, name, pet_owner);
        uint256[] storage owned_pets = ownership[pet_owner];
        pets.push(p);
        AIs.push(brain);
        owned_pets.push(id_seed);
        id_seed += 1;
        return true;
    }
    function ownerCheck(address a, uint256 index) internal view returns (bool isowner) {
        if (pets[index].owner == a) {
            return true;
        }
        else {
            return false;
        }
    }
    function add_attribute(uint256 attribte, uint256 index) public onlyParent returns (bool success) {
        pets[index].add_ons.push(attribte);
        return true;
    }
    function update_ai_dataset(uint256 index, string memory data, uint256 conclusion, uint256 scoring) public returns (bool success) {
        require(msg.sender == AIs[index].owner);
        AIs[index].a[scoring][AIs[index].current_str][conclusion] = data;
        AIs[index].current_str += 1;
        return true;
    }
    function fetch_ai_data(uint256 index, uint256 conclusion, uint256 scoring) public view returns (string memory data) {
        string memory d = AIs[index].a[scoring][AIs[index].current_str][conclusion];
        return d;
    }
    function check_pet_id(uint256 index) public view returns(uint256 res) {
        return pets[index].ID;
    }
    function check_pet_genetics(uint256 index) public view returns(uint256 res) {
        return pets[index].genetics;
    }
    function check_pet_attributes(uint256 index) public view returns(uint256[] memory res) {
        uint256[] memory r = pets[index].add_ons;
        return r;
    }
    function check_pet_name(uint256 index) public view returns(string memory res) {
        return pets[index].name;
    }
    function check_pet_owner(uint256 index) public view returns(address res) {
        return pets[index].owner;
    }
    function transfer(address to, uint256 petIndex, uint256 brainIndex) public returns (bool success) {
        require(AIs[brainIndex].owner == msg.sender);
        require(pets[petIndex].owner == msg.sender);
        AIs[brainIndex].owner = to;
        pets[petIndex].owner = to;
        return true;
    }
    function check_owned_pet_IDs(address owner) public view returns(uint256[] memory owned_pets) {
        return ownership[owner];
    }
    function list_attributes(uint256 index) public view returns(uint256[] memory attributes) {
        return pets[index].add_ons;
    }
} 
