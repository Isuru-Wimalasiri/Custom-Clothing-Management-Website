import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { MdNote } from 'react-icons/md';
import './ownDesign.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { publicRequest } from '../../requestMethods';
import OwnProductMaterial from '../../components/ownProductMaterial/ownProductMaterial';
import FabricModal from '../../components/fabricModal/fabricModal';
import ColorModal from '../../components/colorModal/colorModal';

const OwnDesign = () => {
  const [modalShowFab, setModalShowFab] = useState(false);
  const [modalShowCol, setModalShowCol] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [fabrics, setFabrics] = useState(undefined);
  const [selectedDetails, setSelectedDetails] = useState({});
  const [price, setPrice] = useState(85);

  useEffect(() => {
    const getMaterialDetails = async () => {
      const res = await publicRequest.get('/materials');
      setFabrics(res.data);
    };

    getMaterialDetails();
  }, []);

  const ownProductMeasurements = [
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
      Bust: '',
      Waist: '',
      Hips: '',
      Inseam: '',
      'Shoulder width': '',
      'Arm length': '',
      'Neck circumference': '',
      'Sleeve length': '',
      'Back width': '',
      'Front waistLength': '',
      'Back waistLength': '',
      'Crotch depth': '',
      'Thigh circumference': '',
      'Knee circumference': '',
      'Calf circumference': '',
      'Ankle circumference': '',
      'Bicep circumference': '',
      'Forearm circumference': '',
      'Wrist circumference': '',
    },
    //validate form
    validationSchema: yup.object({
      Bust: yup.number('should be a number!').min(0, 'Invalid number'),
      Waist: yup.number('should be a number!').min(0, 'Invalid number'),
      Hips: yup.number('should be a number!').min(0, 'Invalid number'),
      Inseam: yup.number('should be a number!').min(0, 'Invalid number'),
      'Shoulder width': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Arm length': yup.number('should be a number!').min(0, 'Invalid number'),
      'Neck circumference': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Sleeve length': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Back width': yup.number('should be a number!').min(0, 'Invalid number'),
      'Front waistLength': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Back waistLength': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Crotch depth': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Thigh circumference': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Knee circumference': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Calf circumference': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Ankle circumference': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Bicep circumference': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Forearm circumference': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
      'Wrist circumference': yup
        .number('should be a number!')
        .min(0, 'Invalid number'),
    }),

    // submit form
    onSubmit: async (values) => {
      console.log(values);
      // const { confirmPassword, ...data } = values;
      // const url = 'http://localhost:8800/api/ownDesign/createDesign';
      // setIsDisabled(true);
      // const response = await axios.post(url, data).catch((err) => {
      //   if (err && err.response) {
      //     console.log(err);
      //   }
      // });
      // setIsDisabled(false);
      // if (response && response.data) {
      //   // navigate('/login');
      // }
    },
  });

  const getFabricName = () => {
    const fab = fabrics?.filter((fab) => fab._id === selectedDetails.fabric);
    console.log(fab);
    return <>{fab && fab[0]?.name}</>;
  };
  const getColorName = () => {};

  console.log(fabrics);

  return (
    <Container>
      <div className="headOwnDesign">
        <h1>Design your own product.</h1>
        <div className="wrapperOwnDesign">
          <div className="detailsOwnDesign">
            <Form
              onSubmit={formik.handleSubmit}
              className="px-5 ownDesignForm"
              enctype="multipart/form-data"
            >
              <Form.Group className="mb-3 px-3 ownDesignImgUpload">
                <Form.Label>
                  Upload first image
                  <Form.Control
                    className="ownDesignImgUploadControll"
                    type="file"
                    name=""
                    value={formik.values.measure}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Form.Label>
                <p className=" signupErr p-0">
                  {formik.touched.measure ? formik.errors.measure : ''}
                </p>
              </Form.Group>
              <Form.Group className="mb-3 px-3 ownDesignImgUpload">
                <Form.Label>
                  Upload second image
                  <Form.Control
                    className="ownDesignImgUploadControll"
                    type="file"
                    name=""
                    value={formik.values.measure}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Form.Label>
                <p className=" signupErr p-0">
                  {formik.touched.measure ? formik.errors.measure : ''}
                </p>
              </Form.Group>

              <div className="ownDesignLine"></div>
              <div className="materialDetails mb-3">
                <div className="ownBtns">
                  <button
                    className="insertOwnBtn"
                    onClick={() => {
                      setModalShowFab(true);
                    }}
                  >
                    Select the fabric
                  </button>
                  <div>Fabric: {getFabricName()}</div>
                </div>
                <div className="ownBtns">
                  <button
                    className="insertOwnBtn"
                    onClick={() => {
                      setModalShowCol(true);
                    }}
                  >
                    Select the colour
                  </button>
                  <div>Colour: {getColorName()}</div>
                </div>
              </div>
              <div className="ownDesignLine"></div>
              <div className="ownDesignNote">
                <MdNote size={30} /> It is enough to enter the necessary
                measurements to finish the garment design.
              </div>
              {ownProductMeasurements.map((measure, index) => (
                <Form.Group className="mb-3 px-3 ownDesignInput" key={index}>
                  <Form.Label>
                    {measure}
                    <Form.Control
                      placeholder={measure}
                      type="text"
                      name={measure}
                      value={formik.values.measure}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Form.Label>
                  <p className=" signupErr p-0">
                    {formik.touched[measure] ? formik.errors[measure] : ''}
                  </p>
                </Form.Group>
              ))}

              <Button type="submit" className="submitBtn" disabled={isDisabled}>
                Place Order
              </Button>
            </Form>
          </div>
          <div className="uploadImgOwnDesign"></div>
        </div>
      </div>
      <FabricModal
        onHide={() => setModalShowFab(false)}
        show={modalShowFab}
        fabrics={fabrics}
        setDetails={setSelectedDetails}
        setPrice={setPrice}
      />
      {
        <ColorModal
          onHide={() => setModalShowCol(false)}
          show={modalShowCol}
          fabrics={fabrics}
          fabId={selectedDetails.fabric}
          setDetails={setSelectedDetails}
        />
      }
    </Container>
  );
};

export default OwnDesign;
