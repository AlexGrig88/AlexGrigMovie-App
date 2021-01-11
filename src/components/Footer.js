import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

const Footer = () => {

  return (
    <div className="footer">
      <hr style={{ borderTop: "1px solid #5a606b" }} />
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 0 }}>
            <h3>Развитие и поддержка</h3>
            <p>
              Мой сайт растёт и развивается вместе со мной. Вы можете помочь в
              этом, как финансово, так и отзывами. Я буду учитывать все
              пожелания, чтобы сделать проект максимально дружественым и
              приятным в использовании. Спасибо.
            </p>
          </Col>
          <Col md={{ span: 3, offset: 3 }}>
            <h3>Контакты</h3>
            <ul className="list-unstyled">
              <li>
                <p>
                  <strong>
                    <FaGlobe></FaGlobe> Адрес:
                  </strong>{" "}
                  Россия, Ростов-на-Дону
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    <FaPhoneAlt></FaPhoneAlt> Телефон:
                  </strong>{" "}
                  +7 988 000 00 00
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    <FaEnvelope></FaEnvelope> Email:
                  </strong>{" "}
                  front@google.com
                </p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
