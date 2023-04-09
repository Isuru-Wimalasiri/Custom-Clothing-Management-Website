import { Link, useLocation } from 'react-router-dom';
import './adminSingleProduct.css';
import Chart from '../chart/chart';
import { MdPublish } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

export default function AdminSingleProduct() {
  const location = useLocation();
  const productId = location.pathname.split('/')[3];
  const [pStats, setPStats] = useState([]);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [selectedValuesCheckBox, setSelectedValuesCheckBox] = useState(
    product.mesurements
  );

  const [productSex, setProductSex] = useState(product);
  const allTypeMeasurements = [
    'Bust',
    'Waist',
    'Hips',
    'Inseam',
    'Shoulder width',
    'Arm length',
    'Neck circumference',
    'Sleeve length',
    'Back width',
    'Front waistLength',
    'Back waistLength',
    'Crotch depth',
    'Thigh circumference',
    'Knee circumference',
    'Calf circumference',
    'Ankle circumference',
    'Bicep circumference',
    'Forearm circumference',
    'Wrist circumference',
  ];

  const formik = useFormik({
    //initial values of the form
    initialValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      gender: product.gender,
      inStock: product.inStock,
      mesurements: product.mesurements,
    },

    //validate form
    validationSchema: yup.object({
      name: yup.string(),
      description: yup.string(),
      price: yup.number(),
    }),

    // submit form
    onSubmit: async (values) => {
      // const { confirmPassword, ...data } = values;
      // const url = 'http://localhost:8800/api/ownDesign/createDesign';
      // setIsDisabled(true);
      // const response = await Axios.post(url, data).catch((err) => {
      //   if (err && err.response) {
      //     console.log(err);
      //   }
      // });
      // setIsDisabled(false);
      // if (response && response.data) {
      //   navigate('/login');
      // }
    },
  });

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('orders/income?pid=' + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedValuesCheckBox((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((v) => v !== value);
      } else {
        return [...prevValues, value];
      }
    });
  };

  console.log(product);
  return (
    <div className="singleProduct">
      <div className="singleProductTitleContainer">
        <h1 className="singleProductTitle">Product</h1>
        <Link to="/newproduct">
          <button className="singleProductAddButton">Create</button>
        </Link>
      </div>
      <div className="singleProductTop">
        <div className="singleProductTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="singleProductTopRight">
          <div className="singleProductInfoTop">
            <img src={''} alt="" className="singleProductInfoImg" />
            <span className="singleProductName">{product.name}</span>
          </div>
          <div className="singleProductInfoBottom">
            <div className="singleProductInfoItem">
              <span className="singleProductInfoKey">id:</span>
              <span className="singleProductInfoValue">{product._id}</span>
            </div>
            <div className="singleProductInfoItem">
              <span className="singleProductInfoKey">sales:</span>
              <span className="singleProductInfoValue">5123</span>
            </div>
            {/* <div className="singleProductInfoItem">
              <span className="singleProductInfoKey">in stock:</span>
              <span className="singleProductInfoValue">{product.inStock}</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="singleProductBottom">
        <Form className="singleProductForm">
          <div className="singleProductFormLeft">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="proName">Product Name</Form.Label>
              <Form.Control
                type="text"
                id="proName"
                placeholder={product.name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="proDescription">
                Product Description
              </Form.Label>
              <Form.Control
                as="textarea"
                id="proDescription"
                placeholder={product.description}
                style={{ minHeight: 150, minWidth: 500 }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="proPrice">Product price</Form.Label>
              <Form.Control
                type="text"
                id="proPrice"
                placeholder={product.price}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                defaultValue={product.gender}
                onChange={(e) => {
                  setProductSex(e.target.value);
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Unisex</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="proInStock">In Stock</Form.Label>
              <Form.Control className="" as="select" name="isStock">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Measurements</Form.Label>
              <div className="measurementSet">
                {allTypeMeasurements.map((measure, index) => (
                  <Form.Check
                    key={index}
                    className="measurementCheckBox"
                    type="checkbox"
                    label={measure}
                    value={measure}
                    onChange={handleCheckboxChange}
                    checked={selectedValuesCheckBox.includes(measure)}
                  />
                ))}
              </div>
            </Form.Group>
          </div>

          <div className="singleProductFormRight">
            <div className="singleProductUpload">
              <img src={''} alt="" className="singleProductUploadImg" />
              <Form.Group className="mb-3">
                <Form.Label>
                  <MdPublish />
                  <Form.Control type="file" style={{ display: 'none' }} />
                </Form.Label>
              </Form.Group>
            </div>
            <Button className="singleProductButton" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
