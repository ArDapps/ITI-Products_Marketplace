import React, { useState } from "react";
import ItiMarketplaceABI from "../abis/itiMarketplace.json";
import { ethers } from "ethers";
const CreateProduct = ({ provider, signer, account }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageHash: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const CONTRACT_ADDRESS = "0x40Ac70f36d4C15A4dF1964DE8820Cf59Fd28bDCf";

  console.log(account, "Sihner from create");

  const createProductHandeler = async () => {
    console.log(signer, "Sihner from create");
    if (!signer) return alert("Plaease conncet wallt first");
    setLoading(true);

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ItiMarketplaceABI,
      signer
    );

    const tx = await contract.createProduct(
      newProduct.name,
      ethers.parseEther(newProduct.price),
      newProduct.description,
      newProduct.imageHash
    );
    await tx.wait();
    setLoading(false);

    setNotification({
      type: "success",
      message: `Product Created Sucessfully!Hash ${tx.hash}`,
    });
  };
  return (
    <div className="container">
      {notification && (
        <div className={`alert alert-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div>
        <h2>Create a New Product</h2>
        <div className="mb-4">
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Price in ETH"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Image Hash"
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageHash: e.target.value })
            }
          />
          <button
            className="btn btn-primary"
            onClick={createProductHandeler}
            disabled={loading}
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
