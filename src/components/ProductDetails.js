import React, { useEffect, useState } from "react";
import { SingleItemCard } from "./singleItemCard";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import ItIMarketplaceABI from "../abis/itiMarketplace.json";
const ProductDetails = ({ provider, signer, acount }) => {
  const { id } = useParams();
  const ItIMarketplaceAddress = "0x40Ac70f36d4C15A4dF1964DE8820Cf59Fd28bDCf";
  const [product, setProduct] = useState();

  useEffect(() => {
    if (provider && id) {
      loadProductDeatils();
    }
  }, [provider, id]);
  const loadProductDeatils = async () => {
    try {
      const contract = new ethers.Contract(
        ItIMarketplaceAddress,
        ItIMarketplaceABI,
        provider
      );

      const product = await contract.products(id);
      console.log(product, "=====");

      setProduct(product);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {acount && (
        <p className="alert alert-success">Login User Account : {acount}</p>
      )}
      <SingleItemCard singleProduct={product} signer={signer} />
    </div>
  );
};

export default ProductDetails;
