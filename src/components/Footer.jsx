import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 custom-footer">
            <Container className='pt-7'>
                <Row>
                    <Col md={5}>
                        <h5>Síguenos</h5>
                        <ul className="list-unstyled d-flex"> 
                            <li className="me-3"> 
                                <a href=""  rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebookF} size="lg"  /> 
                                </a>
                            </li>
                            <li className="me-3">
                                <a href="" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contacto</h5>
                        <ul className="list-unstyled">
                            <li><i className="bi bi-geo-alt-fill"></i> Dirección: Calle 123, Santiago</li>
                            <li><i className="bi bi-telephone-fill"></i> Teléfono: +56 9 1234 5678</li>
                            <li><i className="bi bi-envelope-fill"></i> Email: soporte@iu.com</li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12} className="text-center">
                        <p className="mb-0">&copy; 2025 Felipe Sánchez, Verónica Gática y Fabiola Muñoz. Todos los derechos reservados.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;