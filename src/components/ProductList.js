import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import ItiMarketplaceABI from "../abis/itiMarketplace.json";
import { loadProductList } from "../utils/loadProducts";
import { CardItem } from "./cardItem";

const ProductList = ({ provider, signer, account }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadPro();
  }, []);

  const loadPro = async () => {
    const { readyForSellProduct } = await loadProductList();
    console.log(readyForSellProduct, "www");

    setProducts(readyForSellProduct);
  };

  console.log(products);
  return (
    <div>
      <h1>Product List ready for Sell</h1>
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {products &&
        products.map((product, index) => (
          <div>
            <CardItem product={product} />
          </div>
        ))}
    </div>
  );
};

export default ProductList;
