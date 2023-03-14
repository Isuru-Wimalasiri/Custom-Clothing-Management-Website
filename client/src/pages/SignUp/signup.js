import React from 'react';
import './signup.css';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    address: '',
    zipCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the server using axios
    //axios
    //.post('/api/users', formData)
    //.then((res) => console.log(res))
    //.catch((err) => console.log(err));
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="row signup">
        <div className="colu col signupImage">
          <img src="./images/signupImage.jpg" />
        </div>
        <div className="colu col ">
          <h1 className="m-3">Sign Up</h1>
          <Form onSubmit={handleSubmit} className="px-5 ">
            <Form.Group>
              <Form.Control
                className="formComp"
                placeholder="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="formComp"
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="formComp"
                placeholder="E-mail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="formComp"
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="formComp"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="formComp"
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="formComp"
                placeholder="Address"
                type
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="formComp"
                placeholder="Zip Code"
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="formComp"
                placeholder="Country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" className="submitBtn">
              CREATE AN ACCOUNT
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
