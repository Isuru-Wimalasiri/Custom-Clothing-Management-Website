import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { login } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('password is required').min(6),
    }),
    onSubmit: async (values) => {
      login(dispatch, { ...values });
      console.log(currentUser);
    },
  });

  return (
    <div className="container d-flex justify-content-center">
      <div className="row login">
        <div className="colu col signupImage">
          <img src="./images/signupImage.jpg" />
        </div>
        <div className="colu col ">
          <h1 className="m-3">Login</h1>
          <Form onSubmit={formik.handleSubmit} className="px-5 signinForm">
            <Form.Group>
              <Form.Control
                className="formComp"
                placeholder="E-mail"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
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
            </Form.Group>
            <Button type="submit" className="submitBtn" disabled={isFetching}>
              LOG IN
            </Button>
            {error && (
              <h6 style={{ color: 'crimson', fontSize: '15px' }}>
                Somthing went wrong...
              </h6>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
