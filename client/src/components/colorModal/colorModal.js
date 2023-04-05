import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import './colorModal.css';

const ColorModal = ({ setDetails, fabrics, onHide, show, fabId }) => {
  const [selectedColor, setSelectedColor] = useState(undefined);

  const handleColorSelect = (colorId) => {
    setSelectedColor(colorId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedColor) {
      setDetails((prev) => ({
        ...prev,
        color: selectedColor,
      }));
    }
  };

  const printColors = () => {
    const colors = [];
    for (let i = 0; i < fabrics.length; i++) {
      let element = fabrics[i];

      if (fabId === fabrics[i]._id) {
        for (let j = 0; j < element.colors.length; j++) {
          let color = element.colors[j];
          colors.push(
            <div
              className={`material  ${
                selectedColor === color._id ? 'selected' : ''
              }`}
              key={color._id}
            >
              <button
                className="materialBtn"
                onClick={() => handleColorSelect(color._id)}
              >
                <div className="materialImg">
                  <img
                    className="materialPicture"
                    src="../images/product/vcollarblouse.jpg"
                    alt={`${color._id}`}
                  />
                </div>
                <div className="materialName">{color.name}</div>
              </button>
            </div>
          );
        }
      }
    }
    return <div className="materials">{colors}</div>;
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
          Select the color you want
        </Modal.Title>
      </Modal.Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div>
              {fabId === '' ? (
                <div style={{ color: 'crimson' }}>Select a fabric first!</div>
              ) : (
                printColors()
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                console.log(fabId);
                setDetails((prev) => ({ ...prev, color: '' }));
                onHide();
                setSelectedColor(undefined);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={selectedColor === undefined}
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

export default ColorModal;
