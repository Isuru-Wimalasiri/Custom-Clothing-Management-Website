import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import './productCat.css';
function Product(props) {
  return (
    <div className=" card col-sm-2">
      <div className="cardImage">
        <img src={props.url} alt="productImage" />
      </div>
      <div>
        <h3 className="cardName">{props.category.toUpperCase() + 'S'}</h3>
      </div>
    </div>
  );
}

export default Product;
