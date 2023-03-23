import React from 'react';
import {
  MdFavoriteBorder,
  MdOutlineShoppingBag,
  MdOutlineSearch,
} from 'react-icons/md';
import './singleProduct.css';
import { isRouteErrorResponse, Link } from 'react-router-dom';

const SingleProduct = ({ item }) => {
  return (
    <div className="containerProduct">
      <img className="productImage" src="./images/product/vcollarblouse.jpg" />
      <div className="info">
        <div className="icon">
          <Link to={`/product/${item._id}`}>
            <MdOutlineSearch />
          </Link>
        </div>
        <div className="icon">
          <MdFavoriteBorder />
        </div>
      </div>
      <div className="productName">{item.name}</div>
    </div>
  );
};

export default SingleProduct;
