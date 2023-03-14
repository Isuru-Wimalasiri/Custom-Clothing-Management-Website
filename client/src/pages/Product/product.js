import React from 'react';
import './product.css';

import { Container, Row, Col } from 'react-bootstrap';

function Product() {
  return (
    <div>
      <Container className="productContainer">
        <Row>
          <Col md={3}>
            <img
              className="mainPicture"
              src="./images/product/vcollarblouse.jpg"
            />
          </Col>
          <Col className="productDetails">
            <h1 className="productTitle">WOMEN'S LENIN SHIRTS</h1>
            <h6 className="productDescription">
              Do you already know how it feels wearing a made to measure shirt?.
              At CozyVesta we offer you exquisitely tailored women's dress
              shirts. You can choose more than 150 fabrics.--description--
            </h6>
            <h4>
              <div className="insertDetails">
                <button>Select the shirt fabric</button>
                <button>Select the colour</button>
                <button>Insert your measurements</button>
              </div>
            </h4>
            <div className="submitButtons">
              <button>Place Order</button>
              <button>Add to Cart</button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Product;
