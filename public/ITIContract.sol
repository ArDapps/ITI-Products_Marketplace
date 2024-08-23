// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";

contract ITIMarketplace {

    using Counters for Counters.Counter;
   Counters.Counter public  productCount ;
/** 
 * @title Product Item data
 * @dev Implements  the struct for the product Data
 */

 struct Product {
    uint id;
    string name;
   uint  price;
    string description;
    string imageHash;
    address creator;
    address owner;
    bool purchased;
 }


 mapping (uint=>Product) public  products;

/** 
 * Product Created Event
 * @dev Implements  the event show all product creation 
 */

 event ProductCreated(
      uint  indexed  id,
    string name,
   uint  price,
    string description,
    string imageHash,
    address creator,
    address owner,
        bool purchased
 );

 event ProductPurchased(
      uint indexed id,
    string name,
   uint  price,
    string description,
    string imageHash,
    address creator,
    address owner,
        bool purchased
 );

function createProduct( string memory _name,uint _price,string memory _description,string memory _imageHash) public {

require(bytes(_name).length >3,"Name Shoudl Be more than 3 Charachters");
require(bytes(_description).length >15,"Description Shoudl Be more than 15 Charachters");
require(bytes(_imageHash).length >20,"Image Hash Shoudl Be more than 15 Charachters");
require(_price>0,"Price shoudl be more than 0");
require(msg.sender != address(0x0),"U shoudl Connect Wallt First ");

    productCount.increment();

      uint id = productCount.current();

    products[id] = Product(id,_name,_price,_description,_imageHash,msg.sender,address(0x0),false);

    emit ProductCreated(id,_name,_price,_description,_imageHash,msg.sender,address(0x0),false);

 }
 /** 
 * Product Purchased Function
 * @dev Implements  the event show all product creation 
 */
    

    function purchasedProduct(uint _id) public payable {

        Product memory _product = products[_id]; 
        require(_product.id >0 && _product.id<=productCount.current(),"Invaild Product Id");
        require(!_product.purchased ,"Product Already Purchased");
        require(_product.creator !=msg.sender,"Cannot purchase your owne product");

        require(msg.value >= _product.price,"Not Enough Amount Sended");

         payable   (_product.creator).transfer(msg.value);
         _product.owner = msg.sender;
         _product.purchased = true;

         products[_id]=_product;

         emit ProductPurchased (_id,_product.name,_product.price,_product.description,_product.imageHash,_product.creator,msg.sender,true);


    }

}