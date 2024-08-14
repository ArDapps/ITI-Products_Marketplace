import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
const ConnectWallet = ({ setProvider, setSigner, setAccount }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    conncetWalltHandler();
  }, []);
  const conncetWalltHandler = async () => {
    try {
      if (!window.ethereum) throw new Error("Metamask Not Installed");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);

      setProvider(provider);
      setSigner(signer);
      setAccount(accounts[0]);
      setError(null);
    } catch (error) {
      setError(error.mesage);
      console.log(error.mesage);
    }
  };
  return (
    <div className="container py-4">
      <button className="btn btn-danger" onClick={conncetWalltHandler}>
        Connect Wallet
      </button>

      {error && <p className="alert alert-danger">{error}</p>}
    </div>
  );
};

export default ConnectWallet;
