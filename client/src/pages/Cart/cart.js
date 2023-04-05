//import { Add, Remove } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import './cart.css';
// import styled from 'styled-components';
// import Announcement from '../components/Announcement';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
// import { mobile } from '../responsive';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
// import { userRequest } from '../requestMethods';
// import { useHistory } from 'react-router';
import { MdOutlineAdd, MdOutlineRemove, MdClose } from 'react-icons/md';

import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  addProduct,
  changeProductQuantity,
  removeProduct,
} from '../../redux/cartSlice';

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  //const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  //   useEffect(() => {
  //     const makeRequest = async () => {
  //       try {
  //         const res = await userRequest.post('/checkout/payment', {
  //           tokenId: stripeToken.id,
  //           amount: 500,
  //         });
  //         history.push('/success', {
  //           stripeData: res.data,
  //           products: cart,
  //         });
  //       } catch {}
  //     };
  //     stripeToken && makeRequest();
  //   }, [stripeToken, cart.total, history]);

  const printSizes = (product) => {
    const results = [];
    for (const key in product.enteredDetails.measurements) {
      results.push(
        <span style={{ fontSize: 13 }} key={key}>
          {key}: {product.enteredDetails.measurements[key]}
          {'    '}
        </span>
      );
    }
    return results;
  };
  const decreaseQuantity = (index, unitPrice) => {
    dispatch(
      changeProductQuantity({
        index: index,
        unitPrice: unitPrice,
        type: 'DECREMENT_QUANTITY',
      })
    );
  };

  const increaseQuantity = (index, unitPrice) => {
    dispatch(
      changeProductQuantity({
        index: index,
        unitPrice: unitPrice,
        type: 'INCREMENT_QUANTITY',
      })
    );
  };

  const removeProducts = (index, price) => {
    dispatch(
      removeProduct({
        index: index,
        price: price,
      })
    );
  };

  return (
    <Container>
      <div className="wrapper">
        <h1 className="title">YOUR BAG</h1>
        <div className="top">
          <div className="topButton">CONTINUE SHOPPING</div>
          <div className="topTexts">
            <span className="topText">
              Shopping Bag({cart.products.length})
            </span>
            <span className="topText">Your Wishlist (0)</span>
          </div>
          <button className="topButton topBtnFilled">CHECKOUT NOW</button>
        </div>
        <div className="bottom">
          <div className="infoCart">
            {cart.products.map((product, index) => (
              <div>
                <div className="closeBtn">
                  <button
                    onClick={() => {
                      removeProducts(index, product.price);
                    }}
                  >
                    <MdClose />
                  </button>
                </div>
                <div className="product" key={index}>
                  <div className="productDetail">
                    <img
                      className="image"
                      src="../images/product/vcollarblouse.jpg"
                    />
                    <div className="Details">
                      <div className="productNameCart">
                        <b>Product:</b> {product.productData.name}
                      </div>
                      <div className="productId">
                        <b>Material:</b>
                        <img
                          src="../images/product/backtboy1.jpg"
                          height={20}
                          width={20}
                        />{' '}
                        {product.materialData.name}
                      </div>
                      <div className="productColor">
                        <b>Colour :</b>
                        <img
                          src="../images/product/backtboy1.jpg"
                          height={20}
                          width={20}
                        />{' '}
                        {product.colorData.name}
                      </div>
                      <div className="productSize">
                        <b>Sizes:</b> {printSizes(product)}
                      </div>
                    </div>
                  </div>
                  <div className="priceDetail">
                    <div className="productAmountContainer">
                      <button
                        onClick={() =>
                          increaseQuantity(
                            index,
                            product.price / product.enteredDetails.pQuantity
                          )
                        }
                        disabled={product.enteredDetails.pQuantity >= 50}
                      >
                        <MdOutlineAdd size={30} />{' '}
                      </button>
                      <div className="productAmount">
                        {product.enteredDetails.pQuantity}
                      </div>
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            index,
                            product.price / product.enteredDetails.pQuantity
                          )
                        }
                        disabled={product.enteredDetails.pQuantity <= 1}
                      >
                        <MdOutlineRemove size={30} />
                      </button>
                    </div>
                    <div className="productPrice">$ {product.price}</div>
                  </div>
                </div>
                <div className="horline"></div>
              </div>
            ))}
          </div>
          <div className="summary">
            <div className="summaryTitle">ORDER SUMMARY</div>
            <div className="summaryItem">
              <span className="summaryItemText">Subtotal</span>
              <span className="summaryItemPrice">$ {cart.total}</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Estimated Shipping</span>
              <span className="summaryItemPrice">$ 5.90</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Shipping Discount</span>
              <span className="summaryItemPrice">$ -5.90</span>
            </div>
            <div className="summaryItem" type="total">
              <span className="summaryItemText">Total</span>
              <span className="summaryItemPrice">$ {cart.total}</span>
            </div>
            {
              <StripeCheckout
                name="Cozy Vesta"
                image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <button>CHECKOUT NOW</button>
              </StripeCheckout>
            }
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
