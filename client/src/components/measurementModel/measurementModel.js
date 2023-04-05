import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './measurementModel.css';
import { Col, Row, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

const MeasurementModel = ({
  productMeasurements,
  onHide,
  show,
  setDetails,
}) => {
  const initialValueSet = {};
  const SchemaObject = Object.fromEntries(
    productMeasurements.map((field) => [
      field,
      yup
        .number(`${field} is should be a number`)
        .required(`${field} is required`)
        .min(0, `Invalid ${field} size`),
    ])
  );

  useEffect(() => {
    for (let i = 0; i < productMeasurements.length; i++) {
      initialValueSet[productMeasurements[i]] = '';
    }
  }, [productMeasurements, initialValueSet]);

  const formik = useFormik({
    //initial values of the form
    initialValues: initialValueSet,
    //validate form
    validationSchema: yup.object().shape(SchemaObject),

    //submit form
    onSubmit: (values) => {
      console.log(values);
      setDetails((prev) => ({ ...prev, measurements: values }));
      onHide();
    },
  });

  const printMeasurements = () => {
    const requriedValue = [];
    for (let i = 0; i < productMeasurements.length; i += 2) {
      const name1 = productMeasurements[i];
      const name2 = productMeasurements[i + 1];
      requriedValue.push(
        <Row className="mb-3" key={i}>
          <Form.Group as={Col} key={i}>
            <Form.Label>
              {name1} / cm
              <span className="measureErr">
                {formik.touched[name1] ? formik.errors[name1] : ''}
              </span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter your ${name1.toLowerCase()} size`}
              name={name1}
              value={formik.values[name1]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Group>
          {name2 && (
            <Form.Group as={Col} key={i + 1}>
              <Form.Label>
                {name2} / cm
                <span className="measureErr">
                  {formik.touched[name2] ? formik.errors[name2] : ''}
                </span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter your ${name2.toLowerCase()} size`}
                name={name2}
                value={formik.values[name2]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
          )}
        </Row>
      );
    }
    return <div> {requriedValue} </div>;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter your measurements
        </Modal.Title>
      </Modal.Header>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div>{productMeasurements && printMeasurements()}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                onHide();
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
};

export default MeasurementModel;
