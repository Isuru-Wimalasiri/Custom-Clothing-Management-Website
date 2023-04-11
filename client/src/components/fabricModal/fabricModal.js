import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Row, Container, Form } from 'react-bootstrap';
import { publicRequest } from '../../requestMethods';
import { useFormik } from 'formik';
import './fabricModal.css';

const FabricModal = ({
  setDetails,
  fabrics,
  onHide,
  show,
  setPrice,
  pPrice,
}) => {
  const [selectedOption, setSelectedOption] = useState(undefined);

  const handleImageClick = (element) => {
    setSelectedOption(element._id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption) {
      setDetails((prev) => ({
        fabric: selectedOption,
      }));

      let uPrice = undefined;
      fabrics.forEach((element) => {
        if (element._id === selectedOption) {
          uPrice = element.unitPrice + pPrice;
        }
      });

      setPrice(uPrice);
    }
  };

  const printFabrics = () => {
    return (
      <div className="materials">
        {fabrics.map((element) => (
          <div
            className={`material  ${
              selectedOption === element._id ? 'selected' : ''
            }`}
            key={element._id}
          >
            <button
              className="materialBtn"
              onClick={() => handleImageClick(element)}
            >
              <div className="materialImg">
                <img
                  className="materialPicture"
                  src="../images/product/vcollarblouse.jpg"
                  alt={`${element._id}`}
                />
              </div>
              <div className="materialName">{element.name}</div>
            </button>
          </div>
        ))}
      </div>
    );
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
          Select the fabric you want
        </Modal.Title>
      </Modal.Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div>{fabrics && printFabrics()}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                setDetails((prev) => ({ ...prev, fabric: '' }));
                onHide();
                setSelectedOption(undefined);
                setPrice(undefined);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={selectedOption === undefined}
              onClick={() => {
                onHide();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
};

export default FabricModal;
