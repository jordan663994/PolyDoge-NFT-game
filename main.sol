pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

interface pet_mint {
    function add_blank_pet(address pet_owner, uint256 genetics, string memory name) external returns (bool success);
}

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
        uint256 parrent;
    }
    ai[] AIs;
    function add_blank_pet(address pet_owner, uint256 genetics, string memory name) public onlyParent returns (bool success) {
        uint256[] memory d;
        uint256 id = uint256(uint(keccak256(abi.encodePacked(id_seed))));
        ai memory brain = ai(pet_owner, id);
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
    function update_ai_dataset(uint256 index, string memory data, uint256 dir1, uint256 dir2, uint256 dir3) public returns (bool success) {
        require(msg.sender == AIs[index].owner);
        AIs[index].a[dir1][dir2][dir3] = data;
        return true;
    }
    function fetch_ai_data(uint256 index, uint256 dir1, uint256 dir2, uint256 dir3) public view returns (string memory data) {
        string memory d = AIs[index].a[dir1][dir2][dir3];
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
    function transfer(address to, uint256 petIndex, uint256 petIndex2, uint256 brainIndex) public returns (bool success) {
        require(AIs[brainIndex].owner == msg.sender);
        require(pets[petIndex].owner == msg.sender);
        ownership[to].push(ownership[msg.sender][petIndex2]);
        delete ownership[msg.sender][petIndex2];
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
interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
    function mint(address account, uint256 amount) external returns (bool success);
}
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal pure virtual returns (bytes calldata) {
        return msg.data;
    }
}
interface IERC20Metadata is IERC20 {

    function name() external view returns (string memory);


    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);
}
contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    address parent;
    address setter;
    constructor(string memory name_, string memory symbol_, address parent_setter) public {
        _name = name_;
        _symbol = symbol_;
        setter = parent_setter;
    }
    function set_parent(address parent_to_set) public returns (bool success) {
        require (msg.sender == setter);
        parent = parent_to_set;
        setter = address(0);
        return true;
    }
    modifier onlyParent {
        require(msg.sender == parent);
        _;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }


    function decimals() public view virtual override returns (uint8) {
        return 18;
    }


    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }


    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        uint256 currentAllowance = _allowances[sender][_msgSender()];
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
            _approve(sender, _msgSender(), currentAllowance - amount);
        }

        _transfer(sender, recipient, amount);

        return true;
    }


    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        uint256 currentAllowance = _allowances[_msgSender()][spender];
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        _approve(_msgSender(), spender, currentAllowance - subtractedValue);


        return true;
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        _balances[sender] = senderBalance - amount;
        uint256 tax = amount / 100;
        _balances[recipient] += amount - tax;

        emit Transfer(sender, recipient, amount);

        _afterTokenTransfer(sender, recipient, amount);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }
    function mint(address account, uint256 amount) public override onlyParent returns (bool success) {
        _mint(account, amount);
        return true;
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        _balances[account] = accountBalance - amount;
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }


    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}


    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}
contract NFT_control {
    address owner_t1;
    address owner_t2;
    address game;
    Pets p;
    IERC20 token;
    constructor () public {
        owner_t1 = msg.sender;
    }
    struct asset {
        uint256 a;
        uint256 price;
    }
    struct cd {
        uint256 start_time;
        uint256 durration;
    }
    mapping(uint256 => cd) cooldown;
    asset[] assets;
    uint256 current_salt;
    uint256 price = 1000000000;
    function mint_nft(string memory name) public returns (bool success) {
        require(token.transferFrom(msg.sender, address(this), price));
        require(p.add_blank_pet(msg.sender, uint256(uint(keccak256(abi.encodePacked(price, current_salt)))), name));
        price += 1000000;
        current_salt += 1;
        return true;
    }
    function alter_NFT(uint256 asset_index, uint256 pet_index) public returns (bool success) {
        require(msg.sender == p.check_pet_owner(pet_index));
        require(token.transferFrom(msg.sender, address(this), assets[asset_index].price));
        require(p.add_attribute(assets[asset_index].a, pet_index));
        return true;
    }
    function set_p(address _p) public returns (bool success) {
        require(msg.sender == owner_t1);
        p = Pets(_p);
        return true;
    }
    function add_asset(uint256 a, uint256 _price) public returns (bool success) {
        require (msg.sender == owner_t2);
        asset memory new_asset = asset(a, _price);
        assets.push(new_asset);
        return true;
    }
    function finish_setup() public returns (bool success) {
        require (msg.sender == owner_t1);
        owner_t1 = address(0);
        owner_t2 = msg.sender;
        return true;
    }
    function view_asset(uint256 index) public view returns(asset memory a) {
        asset memory a2 = assets[index];
        return a2;
    }
    function view_price() public view returns (uint256 the_price_is) {
        return price;
    }
    function set_game(address new_game) public returns (bool success) {
        require (msg.sender == owner_t1);
        game = new_game;
        return true;
    }
    function mint(address account, uint256 amount) public returns (bool success) {
        require(msg.sender == game);
        require(token.mint(account, amount));
        return true;
    }
    uint256 breed_fee = 100000000;
    function breed(uint256 index1, uint256 index2, string memory name) public returns (bool success) {
        require(p.check_pet_owner(index1) == msg.sender);
        require(p.check_pet_owner(index2) == msg.sender);
        require(cooldown[index1].durration + cooldown[index1].start_time < uint256(block.number));
        require(cooldown[index2].durration + cooldown[index2].start_time < uint256(block.number));
        require(token.transferFrom(msg.sender, address(this), breed_fee));
        uint256 genetics = p.check_pet_genetics(index1) + p.check_pet_genetics(index2);
        require(p.add_blank_pet(msg.sender, genetics / 2, name));
        cooldown[index1].durration += 1000;
        cooldown[index1].start_time = uint256(block.number);
        cooldown[index2].durration += 1000;
        cooldown[index2].start_time = uint256(block.number);
        return true;
    }
}
interface Icontroller {
    function mint(address account, uint256 amount) external returns (bool success);
}
contract exchange {
    Icontroller c;
    IERC20 t;
    constructor (address controller, address PolyDoge) public {
        c = Icontroller(controller);
        t = IERC20(PolyDoge);
    }
    function buy(uint256 amount) public returns (bool success) {
        require(t.transferFrom(msg.sender, <FUNDING RECIPIENT ADDRESS>, amount));
        require(c.mint(msg.sender, amount));
        return true;
    }
}
