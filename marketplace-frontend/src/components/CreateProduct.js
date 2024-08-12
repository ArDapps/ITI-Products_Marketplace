import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [marketplace, setMarketplace] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  useEffect(() => {
    const loadContract = async () => {
      // Fetch the ABI and contract address
      const response = await fetch("/abis.json");
      const data = await response.json();

      // Access the Ethereum provider
      const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6 update
      const signer = await provider.getSigner();

      // Create a new contract instance
      const marketplaceContract = new ethers.Contract(
        data.address, // Contract address from abis.json
        data.abi, // ABI from abis.json
        signer // Use the signer to interact with the contract
      );

      setMarketplace(marketplaceContract);
    };

    loadContract();
  }, []);

  const createProduct = async () => {
    if (!marketplace) {
      setAlert({
        show: true,
        message: "Marketplace contract is not loaded",
        variant: "danger",
      });
      return;
    }

    try {
      const priceInWei = ethers.parseEther(price);
      const tx = await marketplace.createProduct(name, priceInWei);
      await tx.wait();
      setAlert({
        show: true,
        message: "Product created successfully!",
        variant: "success",
      });
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error creating product:", error);
      setAlert({
        show: true,
        message: "Error creating product",
        variant: "danger",
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Create Product</h2>
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              createProduct();
            }}
          >
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Product Price (ETH)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product price in ETH"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
