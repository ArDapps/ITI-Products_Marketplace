import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import ItIMarketplaceABI from "../abis/itiMarketplace.json";
export const SingleItemCard = ({ singleProduct, signer }) => {
  const ItIMarketplaceAddress = "0x40Ac70f36d4C15A4dF1964DE8820Cf59Fd28bDCf";
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (singleProduct && signer) {
      productEvents();
    }
  }, [singleProduct, signer]);
  const buyProductHandeler = async () => {
    setLoading(true);
    const contract = new ethers.Contract(
      ItIMarketplaceAddress,
      ItIMarketplaceABI,
      signer
    );
    const tx = await contract.purchasedProduct(singleProduct.id, {
      value: singleProduct.price,
    });

    await tx.wait();

    setLoading(false);
  };

  const productEvents = async () => {
    const contract = new ethers.Contract(
      ItIMarketplaceAddress,
      ItIMarketplaceABI,
      signer
    );

    const createdFilter = contract.filters.ProductCreated(singleProduct.id);
    const creadedEvents = await contract.queryFilter(createdFilter);

    const purchasedFilter = contract.filters.ProductPurchased(singleProduct.id);
    const purchasedEvents = await contract.queryFilter(purchasedFilter);
    const allEvents = [...creadedEvents, ...purchasedEvents];
    allEvents.sort((a, b) => a.blockNumber - b.blockNumber);
    setEvents(allEvents);
  };

  console.log(events);
  return (
    <div className="container">
      {singleProduct && (
        <div classname="card">
          <img
            classname="card-img-top"
            src={singleProduct.imageHash}
            alt="Card image cap"
            width={500}
            height={250}
          />
          <div classname="card-body">
            <h5 classname="card-title">{singleProduct.name}</h5>
            <p classname="card-text">{singleProduct.description}</p>
          </div>
          <ul classname="list-group list-group-flush">
            <li classname="list-group-item ">
              {" "}
              Price:
              <strong>
                {ethers.formatUnits(singleProduct.price, "ether")}
              </strong>
              ETH
            </li>
            <li classname="list-group-item ">
              {" "}
              Creator:
              <strong>{singleProduct.creator}</strong>
            </li>{" "}
            {singleProduct.purchased && (
              <li classname="list-group-item ">
                Owner:
                <strong>{singleProduct.owner}</strong>
              </li>
            )}
          </ul>
          {loading && (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {!singleProduct.purchased && (
            <button onClick={buyProductHandeler} classname="btn btn-warning">
              Buy Now
            </button>
          )}
        </div>
      )}
      {/* //CReate Table Events */}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Event</th>
            <th scope="col">Price</th>
            <th scope="col">Creator</th>
            <th scope="col">Owner</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <th scope="row">
                {event.eventName === "ProductCreated" ? "Created" : "Purchased"}
              </th>
              <td>{ethers.formatUnits(event.args.price, "ether")}</td>
              <td>{event.args.creator}</td>
              <td>{event.args.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
