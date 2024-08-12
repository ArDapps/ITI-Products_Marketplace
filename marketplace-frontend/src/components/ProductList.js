import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketplace, setMarketplace] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Fetch ABI and contract address from the JSON file
        const response = await fetch("/abis.json");
        const data = await response.json();

        // Access the Ethereum provider
        const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6 update
        const signer = await provider.getSigner();
        const networkId = (await provider.getNetwork()).chainId;

        // Ensure the contract address is available for the current network
        const marketplaceAddress = data.networks[networkId]?.address;

        if (!marketplaceAddress) {
          setAlert({
            show: true,
            message: `Contract not deployed on the current network (ID: ${networkId})!`,
            variant: "danger",
          });
          return;
        }

        // Create a new contract instance
        const marketplaceContract = new ethers.Contract(
          marketplaceAddress,
          data.abi,
          signer
        );

        setMarketplace(marketplaceContract);

        // Fetch and store products
        const productCount = await marketplaceContract.productCount();
        const products = [];
        for (let i = 1; i <= productCount; i++) {
          const product = await marketplaceContract.products(i);
          products.push(product);
        }
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error loading products:", error);
        setLoading(false);
      }
    } else {
      setAlert({
        show: true,
        message: "Please install MetaMask",
        variant: "danger",
      });
      setLoading(false);
    }
  };

  const buyProduct = async (id, price) => {
    if (!marketplace) {
      setAlert({
        show: true,
        message: "Marketplace contract is not loaded",
        variant: "danger",
      });
      return;
    }

    try {
      const tx = await marketplace.purchaseProduct(id, { value: price });
      await tx.wait();
      setAlert({
        show: true,
        message: "Product purchased successfully!",
        variant: "success",
      });
      loadProducts(); // Reload products after purchase
    } catch (error) {
      console.error("Error purchasing product:", error);
      setAlert({
        show: true,
        message: "Error purchasing product",
        variant: "danger",
      });
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Container>
      <h2 className="my-4 text-center">Products</h2>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id.toString()} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  Price: {ethers.formatEther(product.price.toString())} ETH
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => buyProduct(product.id, product.price)}
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
