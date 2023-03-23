import React from 'react';
import './signup.css';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
function Signup() {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    //initial values of the form
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      address: '',
      zipCode: '',
      country: '',
    },
    //validate form
    validationSchema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('password is required').min(6),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'password must match'),
      gender: yup.string().required('gender is required'),
      address: yup.string().required('address is required'),
      zipCode: yup.number().required('zipcode is required'),
      country: yup
        .string()
        .required('country is required')
        .min(4, 'invalid country name')
        .max(56, 'invalid country name'),
    }),

    // submit form
    onSubmit: async (values) => {
      const { confirmPassword, ...data } = values;
      const url = 'http://localhost:8800/api/auth/register';
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
    <div className="container d-flex justify-content-center">
      <div className="row signup">
        <div className="colu col signupImage">
          <img src="./images/signupImage.jpg" />
        </div>
        <div className="colu col ">
          <h1 className="m-3">Sign Up</h1>
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
      </div>
    </div>
  );
}

export default Signup;
