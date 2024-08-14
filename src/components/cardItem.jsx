import React from "react";
import { Link } from "react-router-dom";

export const CardItem = ({ product }) => {
  return (
    <div className="container p-3">
      <div classname="card">
        <img
          classname="card-img-top"
          src={product.imageHash}
          alt="Card image cap"
          width={200}
          height={200}
        />
        <div classname="card-body">
          <h5 classname="card-title">{product.name}</h5>
          <p classname="card-text">{product.description}</p>
          <Link to={`/product/${product.id}`}>
            <button className="btn btn-warning"> View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
