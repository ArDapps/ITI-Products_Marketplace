import { ethers } from "ethers";
import ItiMarketplaceABI from "../abis/itiMarketplace.json";
export const loadProductList = async () => {
  const readyForSellProduct = [];
  const myCreatedProuct = [];

  const myPurchasedProuct = [];
  const CONTRACT_ADDRESS = "0x40Ac70f36d4C15A4dF1964DE8820Cf59Fd28bDCf";

  const INFURA_PROVIDER =
    "https://sepolia.infura.io/v3/c0b72977dfb14156a9424ef2539ebec9";
  const provider = new ethers.JsonRpcProvider(INFURA_PROVIDER);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ItiMarketplaceABI,
    provider
  );
  console.log(contract);
  const productCount = await contract.productCount();

  for (let i = 1; i <= productCount; i++) {
    const product = await contract.products(i);

    if (!product.purchased) {
      readyForSellProduct.push(product);
    }
  }

  //all Products

  return {
    readyForSellProduct,
    myCreatedProuct,
    myPurchasedProuct,
  };
};
