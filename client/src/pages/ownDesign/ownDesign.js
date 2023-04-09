import React from 'react';
import { Container, Form } from 'react-bootstrap';
import './ownDesign.css';
import { useFormik } from 'formik';
import * as yup from 'yup';

const OwnDesign = () => {
  const formik = useFormik({
    //initial values of the form
    initialValues: {
      bust: '',
      waist: '',
      hip: '',
      inseam: '',
      shoulderWidth: '',
      armLength: '',
      neckCircumference: '',
      sleeveLength: '',
      backWidth: '',
      frontWaistLength: '',
      backWaistLength: '',
      crotchDepth: '',
      thighCircumference: '',
      kneeCircumference: '',
      calfCircumference: '',
      ankleCircumference: '',
      bicepCircumference: '',
      forearmCircumference: '',
      wristCircumference: '',
    },
    //validate form
    validationSchema: yup.object({
      bust: yup.number(),
      waist: yup.number(),
      hip: yup.number(),
      inseam: yup.number(),
      shoulderWidth: yup.number(),
      armLength: yup.number(),
      neckCircumference: yup.number(),
      sleeveLength: yup.number(),
      backWidth: yup.number(),
      frontWaistLength: yup.number(),
      backWaistLength: yup.number(),
      crotchDepth: yup.number(),
      thighCircumference: yup.number(),
      kneeCircumference: yup.number(),
      calfCircumference: yup.number(),
      ankleCircumference: yup.number(),
      bicepCircumference: yup.number(),
      forearmCircumference: yup.number(),
      wristCircumference: yup.number(),
    }),

    // submit form
    onSubmit: async (values) => {
      const { confirmPassword, ...data } = values;
      const url = 'http://localhost:8800/api/ownDesign/createDesign';
      setIsDisabled(true);
      const response = await Axios.post(url, data).catch((err) => {
        if (err && err.response) {
          console.log(err);
        }
      });
      setIsDisabled(false);
      if (response && response.data) {
        navigate('/login');
      }
    },
  });

  return (
    <Container>
      <div className="headOwnDesign">
        <h1>Design your own product.</h1>
        <div className="wrapperOwnDesign">
          <div className="detailsOwnDesign">
            <Form onSubmit={formik.handleSubmit} className="px-5 ">
              <Form.Group>
                <Form.Control
                  className="formComp"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <p className=" signupErr p-0">
                  {formik.touched.firstName ? formik.errors.firstName : ''}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="formComp"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className=" signupErr p-0">
                  {formik.touched.lastName ? formik.errors.lastName : ''}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="formComp"
                  placeholder="E-mail"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <p className=" signupErr p-0">
                  {formik.touched.email ? formik.errors.email : ''}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="formComp"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <p className=" signupErr p-0">
                  {formik.touched.password ? formik.errors.password : ''}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="formComp"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                <p className=" signupErr p-0">
                  {formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : ''}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="formComp"
                  as="select"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
                <p className=" signupErr p-0">
                  {formik.touched.gender ? formik.errors.gender : ''}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="formComp"
                  placeholder="Address"
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                <p className=" signupErr p-0">
                  {formik.touched.address ? formik.errors.address : ''}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="formComp"
                  placeholder="Zip Code"
                  type="text"
                  name="zipCode"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                />
                <p className=" signupErr p-0">
                  {formik.touched.zipCode ? formik.errors.zipCode : ''}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="formComp"
                  placeholder="Country"
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                />
                <p className=" signupErr p-0">
                  {formik.touched.country ? formik.errors.country : ''}
                </p>
              </Form.Group>
              <Button type="submit" className="submitBtn" disabled={isDisabled}>
                CREATE AN ACCOUNT
              </Button>
            </Form>
          </div>
          <div className="uploadImgOwnDesign"></div>
        </div>
      </div>
    </Container>
  );
};

export default OwnDesign;
