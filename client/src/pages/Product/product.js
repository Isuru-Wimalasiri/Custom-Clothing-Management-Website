import React, { useEffect, useState } from 'react';
import './product.css';
import MeasurementModel from '../../components/measurementModel/measurementModel.js';
import { Container, Row, Col } from 'react-bootstrap';
import { publicRequest } from '../../requestMethods';
import { useLocation } from 'react-router-dom';
import FabricModal from '../../components/fabricModal/fabricModal';
import ColorModal from '../../components/colorModal/colorModal';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

function Product() {
  const [productData, setProductData] = useState({});
  const [fabrics, setFabrics] = useState(undefined);
  const location = useLocation();
  const [productId, setProductId] = useState(location.pathname.split('/')[2]);
  const [quantity, setQuantity] = useState(1);
  const [singlePrice, setSinglePrice] = useState(undefined);
  const [enteredDetails, setEnteredDetails] = useState({
    fabric: '',
    color: '',
    measurements: {},
    pQuantity: quantity,
  });
  const [modalShowFab, setModalShowFab] = useState(false);
  const [modalShowCol, setModalShowCol] = useState(false);
  const [modalShowMea, setModalShowMea] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProductData = async () => {
      const res = await publicRequest(`/products/find/${productId}`);
      setProductData(res.data);
    };

    const getMaterials = async () => {
      try {
        const res = await publicRequest('/materials');

        setFabrics(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProductData();
    getMaterials();
  }, [productId]);

  const handleAddToCart = () => {
    if (
      enteredDetails.fabric !== '' &&
      enteredDetails.color !== '' &&
      enteredDetails.measurements !== []
    ) {
      const material = fabrics.filter(
        (fab) => fab._id === enteredDetails.fabric
      )[0];
      const color = material.colors.filter(
        (col) => col._id === enteredDetails.color
      )[0];
      const detailsToCart = {
        productData: productData,
        materialData: material,
        colorData: color,
        price: singlePrice * quantity,
        enteredDetails,
      };
      dispatch(
        addProduct({ product: detailsToCart, price: singlePrice * quantity })
      );
    }
  };

  return (
    <div>
      <Container className="productContainer">
        <Row>
          <Col md={3}>
            <img
              className="mainPicture"
              src="../images/product/vcollarblouse.jpg"
            />
          </Col>
          <Col className="productDetails">
            <h1 className="productTitle">{productData.name}</h1>
            <h6 className="productDescription">{productData.description}</h6>
            <h1 className="price">{singlePrice && `$ ${singlePrice}`}</h1>
            <h4>
              <div className="insertDetails">
                <button
                  className="insertBtn"
                  onClick={() => {
                    setModalShowFab(true);
                  }}
                >
                  Select the fabric
                </button>
                <button
                  className="insertBtn"
                  onClick={() => {
                    setModalShowCol(true);
                  }}
                >
                  Select the colour
                </button>
                <button
                  className="insertBtn"
                  onClick={() => {
                    setModalShowMea(true);
                  }}
                >
                  Insert your measurements
                </button>
                <div className="quantityArea">
                  <button
                    className="quantityBtn"
                    onClick={() => {
                      setQuantity(quantity - 1);
                      setEnteredDetails((prev) => ({
                        ...prev,
                        pQuantity: prev.pQuantity - 1,
                      }));
                    }}
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    className="quantityBtn"
                    onClick={() => {
                      setQuantity(quantity + 1);
                      setEnteredDetails((prev) => ({
                        ...prev,
                        pQuantity: prev.pQuantity + 1,
                      }));
                    }}
                    disabled={quantity === 50}
                  >
                    +
                  </button>
                </div>
              </div>
            </h4>
            <div className="submitButtons">
              <button
                disabled={
                  enteredDetails.fabric === '' ||
                  enteredDetails.fabric === '' ||
                  enteredDetails.measurements === []
                }
              >
                Place Order
              </button>
              <button
                onClick={handleAddToCart}
                disabled={
                  enteredDetails.fabric === '' ||
                  enteredDetails.fabric === '' ||
                  enteredDetails.measurements === []
                }
              >
                Add to Cart
              </button>
            </div>
            <div></div>
          </Col>
        </Row>

        {productData.mesurements && (
          <FabricModal
            onHide={() => setModalShowFab(false)}
            show={modalShowFab}
            fabrics={fabrics}
            setDetails={setEnteredDetails}
            setPrice={setSinglePrice}
            pPrice={productData.price}
          />
        )}

        {productData.mesurements && (
          <ColorModal
            onHide={() => setModalShowCol(false)}
            show={modalShowCol}
            fabrics={fabrics}
            fabId={enteredDetails.fabric}
            setDetails={setEnteredDetails}
          />
        )}

        {productData.mesurements && (
          <MeasurementModel
            productMeasurements={productData.mesurements}
            onHide={() => setModalShowMea(false)}
            show={modalShowMea}
            key={productData._id}
            setDetails={setEnteredDetails}
          />
        )}
      </Container>
    </div>
  );
}

export default Product;
