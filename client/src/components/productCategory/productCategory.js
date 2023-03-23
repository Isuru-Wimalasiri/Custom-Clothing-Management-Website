import React from 'react';
import { useNavigate } from 'react-router-dom';
import './productCat.css';

function Product({ category, url, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/productList/${id}`);
  };

  return (
    <button className="mainCatButton" onClick={handleClick}>
      <div className=" card col-sm-2">
        <div className="cardImage">
          <img src={url} alt="productImage" />
        </div>
        <div>
          <h3 className="cardName">{category.toUpperCase() + 'S'}</h3>
        </div>
      </div>
    </button>
  );
}

export default Product;
