import { Container, Col, Row, Button } from 'react-bootstrap';
import './footer.css';
import { Link } from 'react-router-dom';
import { MdSend, MdFacebook } from 'react-icons/md';
import { GrTwitter, GrInstagram } from 'react-icons/gr';

export const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row className="justify-content-md-center">
        <Col lg="3" className="d-flex justify-content-center">
          <div>
            <div className="footerTopic">QUESTIONS</div>
            <div className="list">
              <ul>
                <li>Help & contact</li>
                <li>Track order</li>
                <li>Terms and conditions</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col lg="3" className="d-flex justify-content-center">
          <div>
            <div className="footerTopic">WOMEN’S STORE</div>
            <div className="list">
              <ul>
                <li>Custom blouses</li>
                <li>Custom dressesr</li>
                <li>Custom pants</li>
                <li>Custom skirts</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col lg="3" className="d-flex justify-content-center">
          <div>
            <div className="footerTopic">MEN’S STORE</div>
            <div className="list">
              <ul>
                <li>Custom shirts</li>
                <li>Custom pants</li>
                <li>Custom shorts</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col lg="3" className="d-flex justify-content-center">
          <div>
            <div className="footerTopic">NEWSLETTER</div>
            <div className="list">
              <ul>
                <li className="py-1">
                  <form>
                    <input
                      type="text"
                      className="newText"
                      placeholder="Enter email"
                    />
                    <Button type="submit" className="border-0 newBtn">
                      <MdSend size={30} />
                    </Button>
                  </form>
                </li>
                <li className="py-1" style={{ fontWeight: 600 }}>
                  Follow CozyVesta
                </li>
                <li className="py-1">
                  <MdFacebook size={30} className="socialMedia" />
                  <GrTwitter size={30} className="socialMedia" />
                  <GrInstagram size={30} className="socialMedia" />
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
