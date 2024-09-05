// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CryptoBasket {
    address public owner;

    struct Item {
        uint256 id;
        string name; 
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event List(string name, uint256 cost, uint256 quantity);
    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event Withdraw(address owner, uint256 balance);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");  // ## run before the function body
        _;  // ## function body
    }

    constructor() {
        owner = msg.sender;
    }

    // List Products
    function list(
        uint256 _id, 
        string memory _name, 
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        // This function lists a new product

        // Create Item Struct
        Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stock);

        // Save Item Struct to blockchain
        items[_id] = item;

        // Emit event
        emit List(_name, _cost, _stock);
    }

    // Buy Products
    function buy(uint256 _id) public payable {  // ## "payable" allows users to send ether when they call this function
        // This function buys a product

        // Fetch item
        Item memory item = items[_id];

        // Require enough ether to buy item
        require(msg.value >= item.cost, "Not enough ether");

        // Require the item is in stock
        require(item.stock > 0, "Out of stock");

        // Create an order
        Order memory order = Order(block.timestamp, item);

        // Add order for user
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock
        items[_id].stock = item.stock - 1;

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    // Withdraw Funds from the Smart Contract
    function withdraw() public onlyOwner {
        // This function withdraws funds from the contract

        uint256 balance = address(this).balance;

        // Send all Ether in the contract to the 'owner' address
            // ## The value keyword below specifies the amount of Ether
            // to send, which is set to the total balance of the contract
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Transfer failed");
        // payable(owner).transfer(balance);  // ## Another way to do it

        // Emit the event with the withdrawn amount
        emit Withdraw(owner, balance);
    }
}
