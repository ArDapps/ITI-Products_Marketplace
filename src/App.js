import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CustomNavBar from "./components/CustomNavBar";
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import ConnectWallet from "./components/ConnectWallet";
import { useState } from "react";
import ProductDetails from "./components/ProductDetails";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const [account, setAccount] = useState(null);

  return (
    <Router>
      <CustomNavBar />
      <ConnectWallet
        setProvider={setProvider}
        setSigner={setSigner}
        setAccount={setAccount}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              provider={provider}
              signer={signer}
              account={account}
            />
          }
        />
        <Route
          path="/create-product"
          element={
            <CreateProduct
              provider={provider}
              signer={signer}
              account={account}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              provider={provider}
              signer={signer}
              account={account}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
