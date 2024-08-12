// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Product {
        uint id;
        string name;
        uint price; // in wei
        address payable owner;
        bool purchased;
    }

    mapping(uint => Product) public products;
    uint public productCount = 0;

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );

    function createProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Product name is required");
        require(_price > 0, "Product price should be greater than zero");

        productCount++;
        products[productCount] = Product(productCount, _name, _price, payable(msg.sender), false);

        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        require(_product.id > 0 && _product.id <= productCount, "Invalid product ID");
        require(msg.value >= _product.price, "Not enough Ether sent");
        require(!_product.purchased, "Product already purchased");
        require(_product.owner != msg.sender, "Cannot purchase your own product");

        _product.owner.transfer(msg.value);
        _product.purchased = true;
        products[_id] = _product;

        emit ProductPurchased(_id, _product.name, _product.price, msg.sender, true);
    }
}
